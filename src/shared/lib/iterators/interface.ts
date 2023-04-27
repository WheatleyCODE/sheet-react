export type Predicate<T> = (value: T) => boolean;
export type MapCallback<T, N> = (value: T) => N;
export type ForEachCallback<T> = (value: T) => void;
