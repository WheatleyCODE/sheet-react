export type CurryFirst<T> = T extends (x: infer U, ...rest: any) => any ? U : never;
export type CurryRest<T> = T extends (x: infer U) => infer V
  ? U
  : T extends (x: infer U, ...rest: infer V) => infer W
  ? Curried<(...args: V) => W>
  : never;

export type Curried<T extends (...args: any) => any> = (x: CurryFirst<T>) => CurryRest<T>;
