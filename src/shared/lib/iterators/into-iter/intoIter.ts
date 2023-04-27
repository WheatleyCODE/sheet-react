export function* intoIter(obj: any) {
  if (obj == null) return;

  const iter = obj[Symbol.iterator];

  if (iter != null && typeof iter === 'function') {
    yield* iter();
    return;
  }

  if (typeof obj === 'object') {
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        yield obj[key];
      }
    }

    return;
  }

  yield obj;
}
