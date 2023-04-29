import { ISyncPromise, SyncPromiseStatus } from './interface';

export class SyncPromise<T = unknown, E = unknown> implements ISyncPromise<T, E> {
  private value!: T;
  private reason!: E;

  status: SyncPromiseStatus;
  readonly onFulfilled: ((value?: T) => void)[];
  readonly onRejected: ((reason?: E) => void)[];

  static resolve<T = unknown>(value: T): SyncPromise<T>;
  static resolve(): SyncPromise<void>;
  static resolve<T>(value?: T): SyncPromise<T> {
    if (value instanceof SyncPromise) {
      return value;
    }

    return new SyncPromise((resolve) => {
      resolve(value);
    });
  }

  static reject<T = unknown>(value: T): SyncPromise<T>;
  static reject(): SyncPromise<void>;
  static reject<T>(value?: T): SyncPromise<T> {
    return new SyncPromise((_, reject) => {
      reject(value);
    });
  }

  static all<T>(iterable: Iterable<T>): SyncPromise<any[]> {
    const tasks: T[] = Array.from(iterable);
    const syncPromiseTasks: SyncPromise<T>[] = new Array(tasks.length);

    if (tasks.length === 0) return SyncPromise.resolve(<any[]>[]);

    return new SyncPromise((resolve, reject) => {
      const results = new Array(tasks.length);
      let done = 0;

      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        syncPromiseTasks[i] = SyncPromise.resolve(task);

        syncPromiseTasks[i]
          .then((res) => {
            results[i] = res;
            done += 1;

            if (done === tasks.length) {
              resolve(results);
            }
          })
          .catch(reject);
      }
    });
  }

  static allSetteld<T>(iterable: Iterable<T>): SyncPromise<any[]> {
    const tasks: T[] = Array.from(iterable);
    const syncPromiseTasks: SyncPromise<T>[] = new Array(tasks.length);

    if (tasks.length === 0) return SyncPromise.resolve(<any[]>[]);

    return new SyncPromise((resolve) => {
      const results = new Array(tasks.length);
      let done = 0;

      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        syncPromiseTasks[i] = SyncPromise.resolve(task);

        syncPromiseTasks[i]
          .then((value) => {
            results[i] = { status: 'fulfilled', value };
            done += 1;

            if (done === tasks.length) {
              resolve(results);
            }
          })
          .catch((reason) => {
            results[i] = { status: 'fulfilled', reason };
            done += 1;

            if (done === tasks.length) {
              resolve(results);
            }
          });
      }
    });
  }

  static race<T>(iterable: Iterable<T>): SyncPromise<any> {
    const tasks: T[] = Array.from(iterable);

    return new SyncPromise((resolve, reject) => {
      for (let i = 0; i < tasks.length; i++) {
        SyncPromise.resolve(tasks[i]).then(resolve, reject);
      }
    });
  }

  constructor(constr: (resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => void) {
    this.status = 'pending';

    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = (value?: any) => {
      if (this.status !== 'pending') return;

      if (value != null && typeof value.then === 'function') {
        value.then(resolve, reject);
      }

      this.status = 'fulfilled';
      this.value = value;

      for (const fn of this.onFulfilled) {
        fn(this.value);
      }
    };

    const reject = (error?: any) => {
      if (this.status !== 'pending') return;

      this.status = 'rejected';
      this.reason = error;

      for (const fn of this.onRejected) {
        fn(this.reason);
      }

      // ! Error J_J
      // queueMicrotask(() => {
      //   if (this.onRejected.length === 0) {
      //     void Promise.reject(this.reason);
      //   }
      // });
    };

    try {
      constr(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then<F>(onFulfilled: (value: T) => F): ISyncPromise<F>;
  then<F, R>(onFulfilled: (value: T) => F, onRejected: (value: E) => R): ISyncPromise<R>;
  then<F, R>(onFulfilled?: (value: T) => F, onRejected?: (value: E) => R): ISyncPromise<F | R> {
    return new SyncPromise((resolve, reject) => {
      const wrappedResolve = () => {
        try {
          resolve(onFulfilled ? onFulfilled(this.value) : this.value);
        } catch (err) {
          reject(err);
        }
      };

      const wrappedReject = () => {
        if (onRejected) {
          try {
            resolve(onRejected(this.reason));
          } catch (err) {
            reject(err);
          }

          return;
        }

        reject(this.reason);
      };

      if (this.status === 'fulfilled') {
        wrappedResolve();
        return;
      }

      if (this.status === 'rejected') {
        wrappedReject();
        return;
      }

      this.onFulfilled.push(wrappedResolve);
      this.onRejected.push(wrappedReject);
    });
  }

  catch<R>(onRejected: (reason: E) => R): ISyncPromise<R>;
  catch(): ISyncPromise<void>;
  catch<R>(onRejected?: (reason: E) => R): ISyncPromise<R> {
    return new SyncPromise((resolve, reject) => {
      const wrappedReject = () => {
        if (onRejected) {
          try {
            resolve(onRejected(this.reason));
          } catch (err) {
            reject(err);
          }

          return;
        }

        reject(this.reason);
      };

      if (this.status === 'fulfilled') {
        resolve(this.value);
        return;
      }

      if (this.status === 'rejected') {
        wrappedReject();
        return;
      }

      this.onFulfilled.push(resolve);
      this.onRejected.push(wrappedReject);
    });
  }

  finally<F>(onFinally: () => any): ISyncPromise<F>;
  finally(): ISyncPromise<void>;
  finally<F>(onFinally?: () => any): ISyncPromise<F> {
    return new SyncPromise((resolve, reject) => {
      const wrappedResolve = () => {
        try {
          let res = onFinally?.();

          if (res && typeof res.then === 'function') {
            res = res.then(() => this.value);
          } else {
            res = this.value;
          }

          resolve(res);
        } catch (err) {
          reject(err);
        }
      };

      const wrappedReject = () => {
        try {
          let res = onFinally?.();

          if (typeof res.then === 'function') {
            res = res.then(() => {
              throw this.reason;
            });

            resolve(res);
          } else {
            reject(this.reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.status === 'fulfilled') {
        wrappedResolve();
        return;
      }

      if (this.status === 'rejected') {
        wrappedReject();
        return;
      }

      this.onFulfilled.push(wrappedResolve);
      this.onRejected.push(wrappedReject);
    });
  }
}
