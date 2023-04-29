export type Constructor<T> = (...args: any[]) => Promise<T>;

export type RetryParams = {
  tries?: number;
  delay?: number;
  onRetry?: () => void;
};
