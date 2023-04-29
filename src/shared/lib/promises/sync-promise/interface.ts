export type SyncPromiseStatus = 'fulfilled' | 'rejected' | 'pending';

export interface ISyncPromise<V, E = unknown> {
  status: SyncPromiseStatus;

  readonly onFulfilled: ((value: V) => void)[];
  readonly onRejected: ((reason: E) => void)[];

  then<F, R>(onFulfilled?: (value: V) => F, onRejected?: (reason: E) => R): ISyncPromise<F>;

  catch<R>(onRejected?: (reason: E) => R): ISyncPromise<R>;
  finally<F>(onFinally?: () => any): ISyncPromise<F>;
}
