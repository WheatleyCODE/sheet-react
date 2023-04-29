export const promisify = <T, A>(callback: (...args: A[]) => T): ((...args: A[]) => Promise<T>) => {
  return (...args: A[]) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(callback(...args));
      } catch (err) {
        reject(err);
      }
    });
  };
};
