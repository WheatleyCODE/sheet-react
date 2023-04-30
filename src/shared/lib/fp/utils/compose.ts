// eslint-disable-next-line @typescript-eslint/ban-types
export const compose = <F extends Function>(...funcs: F[]) => {
  return (x: any) => {
    return funcs.reduceRight((acc, func) => func(acc), x);
  };
};
