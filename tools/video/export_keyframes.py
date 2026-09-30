"""Render the keyframes in keyframes.html to 1920x1080 PNGs.

Uses the installed Chrome (or Edge) headless against the file itself, so no
server is needed. Writes output/video/keyframes/K01.png ... K19.png and a
contact sheet when ffmpeg is on the PATH.

    python tools/video/export_keyframes.py            # every frame
    python tools/video/export_keyframes.py K05 K07    # just these
"""
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "tools" / "video" / "keyframes.html"
OUT = ROOT / "output" / "video" / "keyframes"
BROWSERS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]


def browser() -> str:
    for path in BROWSERS:
        if Path(path).exists():
            return path
    sys.exit("Chrome or Edge not found.")


def main(only: set[str]) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    ids = re.findall(r'<section class="frame" id="(K\d+)"', SRC.read_text(encoding="utf-8"))
    # A throwaway profile, so a Chrome window that is already open can't
    # swallow the headless launch.
    with tempfile.TemporaryDirectory() as profile:
        for frame_id in ids:
            if only and frame_id not in only:
                continue
            png = OUT / f"{frame_id}.png"
            subprocess.run(
                [
                    browser(), "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--allow-file-access-from-files", "--force-device-scale-factor=1",
                    "--window-size=1920,1080", "--virtual-time-budget=5000",
                    f"--user-data-dir={profile}", f"--screenshot={png}",
                    f"{SRC.as_uri()}?frame={frame_id}",
                ],
                check=True,
                capture_output=True,
            )
            print(png.relative_to(ROOT))

    if not only and shutil.which("ffmpeg"):
        sheet = OUT / "contact-sheet.png"
        subprocess.run(
            [
                "ffmpeg", "-y", "-loglevel", "error", "-i", str(OUT / "K%02d.png"),
                "-filter_complex", "scale=640:-1,tile=4x5:padding=16:margin=16:color=0x0C0E11",
                "-frames:v", "1", str(sheet),
            ],
            check=True,
        )
        print(sheet.relative_to(ROOT))


if __name__ == "__main__":
    main(set(sys.argv[1:]))
