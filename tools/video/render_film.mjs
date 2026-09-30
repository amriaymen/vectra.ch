// Render film.html to video, frame by frame, through headless Chrome.
//
//   node --experimental-websocket tools/video/render_film.mjs                  # full film, 60 fps
//   node --experimental-websocket tools/video/render_film.mjs --fps 30 --from 20 --to 30
//   node --experimental-websocket tools/video/render_film.mjs --stills 5,14.2,51.8
//   node --experimental-websocket tools/video/render_film.mjs --fmt v            # 9:16, 1080×1920
//   node --experimental-websocket tools/video/render_film.mjs --page film-v2.html # another film page
//
// Writes the sound cues the film declares (cues.json) next to the video so
// sfx.py can build the soundtrack from the same timeline.
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const FPS = +(args.fps ?? 60);
const VERTICAL = args.fmt === 'v';
const PAGE = args.page ?? 'film.html';
const [W, H] = VERTICAL ? [1080, 1920] : [1920, 1080];
const BUILD = path.resolve(args.build ?? path.join(tmpdir(), 'vectra-video'));
const OUT = path.resolve(args.out ?? path.join(BUILD, VERTICAL ? 'film-video-9x16.mp4' : 'film-video.mp4'));
// Chrome first: headless Edge stalls on screenshots after a few dozen frames.
// Puppeteer's Chrome for Testing build counts too, when there is no installed Chrome.
const PUPPETEER = path.join(homedir(), '.cache/puppeteer/chrome');
const cft = existsSync(PUPPETEER) ? readdirSync(PUPPETEER).sort().reverse().map(v => path.join(PUPPETEER, v, 'chrome-win64/chrome.exe')) : [];
const CHROME = [process.env.VX_BROWSER, 'C:/Program Files/Google/Chrome/Application/chrome.exe', ...cft,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean).find(existsSync);
if (!CHROME) throw new Error('Chrome or Edge not found.');
mkdirSync(BUILD, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
// Port 0 lets Chrome pick a free port and write it to DevToolsActivePort, so
// two renders running side by side can never attach to the same browser.
const profile = mkdtempSync(path.join(tmpdir(), 'vx-chrome-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=1',
  `--window-size=${W},${H}`, '--mute-audio',
  // A headless window can be treated as hidden and stop producing frames mid-render.
  '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--no-first-run', '--no-default-browser-check', 'about:blank',
], { stdio: 'ignore' });

let port;
for (let i = 0; i < 150 && !port; i++) {
  try { port = readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split(/\s+/)[0]; } catch { await sleep(100); }
}
if (!port) throw new Error('Chrome did not start its DevTools server.');
let targets = [];
for (let i = 0; i < 100 && !targets.some(t => t.type === 'page'); i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch { await sleep(150); }
}
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let seq = 0;
const pending = new Map(), waiters = new Map();
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
  else if (m.method && waiters.has(m.method)) { waiters.get(m.method)(m.params); waiters.delete(m.method); }
};
const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
const once = method => new Promise(res => waiters.set(method, res));
async function evaluate(expression) {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
}
// Edge sometimes never answers a screenshot request; after 4 s, repaint and ask again.
const capture = async t => {
  for (let attempt = 1; ; attempt++) {
    const timeout = new Promise(res => setTimeout(() => res(null), 4000));
    const r = await Promise.race([send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true }), timeout]);
    if (r) return r;
    if (attempt === 3) throw new Error(`Screenshot at ${t} s timed out three times.`);
    console.log(`screenshot at ${t} s timed out, retrying`);
    await evaluate(`paint(${t})`);
  }
};
const shot = async t => {
  const png = Buffer.from((await capture(t)).data, 'base64');
  const w = png.readUInt32BE(16), h = png.readUInt32BE(20);
  if (w !== W || h !== H) throw new Error(`Frame is ${w}×${h}, expected ${W}×${H}.`);
  return png;
};

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  // Keep the tab focused and in front, or headless Edge can stop answering screenshots.
  await send('Emulation.setFocusEmulationEnabled', { enabled: true });
  await send('Page.bringToFront');
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url: `${pathToFileURL(path.join(HERE, PAGE)).href}?render=1${VERTICAL ? '&fmt=v' : ''}` });
  await loaded;
  await evaluate('READY');
  // Refuse to render the wrong thing: size and format must match what was asked.
  const page = await evaluate('({ w: innerWidth, h: innerHeight, v: document.documentElement.dataset.fmt === "v" })');
  if (page.w !== W || page.h !== H || page.v !== VERTICAL) throw new Error(`Page is ${page.w}×${page.h} (vertical: ${page.v}), expected ${W}×${H} (vertical: ${VERTICAL}).`);
  const { duration, lead, cues } = await evaluate('({ duration: DURATION, lead: LEAD, cues: CUES })');
  writeFileSync(path.join(BUILD, 'cues.json'), JSON.stringify({ duration, lead, cues }, null, 1));

  if (args.stills) {
    const dir = path.resolve(args.dir ?? path.join(BUILD, 'stills'));
    mkdirSync(dir, { recursive: true });
    for (const t of args.stills.split(',').map(Number)) {
      await evaluate(`paint(${t})`);
      const file = path.join(dir, `t${t.toFixed(2).padStart(6, '0')}.png`);
      writeFileSync(file, await shot(t));
      console.log(file);
    }
  } else {
    const from = +(args.from ?? 0), to = Math.min(+(args.to ?? duration), duration);
    const first = Math.round(from * FPS), last = Math.round(to * FPS);
    const ff = spawn('ffmpeg', [
      '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
      '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-tune', 'animation',
      '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
      '-movflags', '+faststart', OUT,
    ], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error(`ffmpeg exited ${c}`)))));
    const t0 = Date.now();
    for (let i = first; i < last; i++) {
      await evaluate(`paint(${i / FPS})`);
      const png = await shot(i / FPS);
      if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
      if ((i - first) % (FPS * 2) === 0) {
        const n = i - first + 1, rate = n / ((Date.now() - t0) / 1000);
        console.log(`frame ${i}/${last}  ${(i / FPS).toFixed(1)} s  ${rate.toFixed(1)} fps  eta ${((last - i) / rate / 60).toFixed(1)} min`);
      }
    }
    ff.stdin.end();
    await done;
    console.log(OUT);
  }
} finally {
  ws.close();
  chrome.kill();
  // On Windows the launcher exits at once and the real browser keeps running, so end
  // every process started with this render's profile folder.
  if (process.platform === 'win32') {
    const filter = `Get-CimInstance Win32_Process -Filter "Name='msedge.exe' or Name='chrome.exe'" | Where-Object { $_.CommandLine -like '*${path.basename(profile)}*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`;
    spawnSync('powershell', ['-NoProfile', '-Command', filter], { stdio: 'ignore' });
  }
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
