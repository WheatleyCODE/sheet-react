// eslint-disable-next-line @typescript-eslint/ban-types
export const compose = <T>(...fns: Function[]): ((arg: T) => T) => {
  return (arg: T): T => {
    return fns.reduceRight((result, fn) => fn(result), arg);
  };
};
