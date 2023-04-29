export const abortable = <T>(promise: Promise<T>, abortSignal: AbortSignal): Promise<T> => {
  return new Promise((resolve, reject) => {
    const onAbort = () => {
      reject('Aborted');
    };

    abortSignal.addEventListener('abort', onAbort);

    promise.then(
      (res) => {
        abortSignal.removeEventListener('abort', onAbort);
        resolve(res);
      },
      (err) => {
        abortSignal.removeEventListener('abort', onAbort);
        reject(err);
      }
    );
  });
};
