export const executor = (gen: Generator, value?: any): Promise<any> => {
  const res = gen.next(value);
  const promise = Promise.resolve(res.value);

  if (res.done) {
    return promise;
  }

  return promise.then(
    (val) => executor(gen, val),
    (err) => {
      const res = gen.throw(err);

      if (res.done) {
        return res.value;
      }

      return executor(gen, res.value);
    }
  );
};
