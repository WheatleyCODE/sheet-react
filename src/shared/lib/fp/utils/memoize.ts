export function memoize<T extends (...args: unknown[]) => any>(fn: T): T {
  const cache = new Map();

  return function memoized(...args: Parameters<T>): ReturnType<T> {
    const key = args.toString();
    const cachedResult = cache.get(key);

    if (cachedResult) {
      return cachedResult;
    }

    const result = fn.call(null, ...args);
    cache.set(key, result);

    return result;
  } as T;
}
