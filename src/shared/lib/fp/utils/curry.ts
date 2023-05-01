import { Curried, CurryFirst, CurryRest } from './interfaces';

export const curry = <T extends (...args: any) => any>(fn: T): Curried<T> => {
  if (!fn.length) {
    return fn();
  }

  return (arg: CurryFirst<T>): CurryRest<T> => {
    return curry(fn.bind(null, arg) as any) as any;
  };
};
