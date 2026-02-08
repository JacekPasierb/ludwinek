/**
 * Prosty in-memory rate limiter.
 * Uwaga: działa per-instancja – na wielu serwerach użyj Redis.
 */

type Entry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Entry>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minut

function prune(now: number) {
  for (const [key, entry] of store.entries()) {
    if (now >= entry.resetAt) store.delete(key);
  }
}

export function checkRateLimit(
  key: string,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS
): {allowed: boolean; remaining: number; resetAt: number} {
  const now = Date.now();
  prune(now);

  const entry = store.get(key);

  if (!entry) {
    store.set(key, {count: 1, resetAt: now + windowMs});
    return {allowed: true, remaining: limit - 1, resetAt: now + windowMs};
  }

  if (now >= entry.resetAt) {
    store.set(key, {count: 1, resetAt: now + windowMs});
    return {allowed: true, remaining: limit - 1, resetAt: now + windowMs};
  }

  entry.count += 1;

  if (entry.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}
