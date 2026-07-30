/**
 * Per-instance fixed-window limiter. Resets on cold start and is not shared
 * across instances — adequate as a speed bump. Use a shared store if abuse
 * becomes real.
 */
const buckets = new Map<string, number[]>();

export function rateLimited(key: string, max: number, windowMs = 60_000) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > max;
}

export function clientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
