export const arrayView = <T>(...arrays: T[][]) => {
  return new Proxy([], {
    get(target, p, receiver) {
      if (p === 'length') {
        return arrays.reduce((res, arr) => res + arr.length, 0);
      }

      const index = Number(p);

      if (!isNaN(index) && index >= 0 && index % 1 === 0 && index < 2 ** 32) {
        let l = 0;

        // todo сделать бинарный поиск
        for (const arr of arrays) {
          const o = l;
          l += arr.length;

          if (index < l) {
            return arr[index - o];
          }
        }

        return undefined;
      }

      return Reflect.get(target, p, receiver);
    },
  });
};
