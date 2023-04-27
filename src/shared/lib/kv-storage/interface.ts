import { CanPromise, Nullable } from 'shared/types/utils';

export interface KVStorageEngine {
  get(key: string): CanPromise<Nullable<string>>;
  set(key: string, value: string): CanPromise<void>;
  remove(key: string): CanPromise<void>;
}

export type SerializablePrimitiveValue = string | number | boolean | null;

export type SerializableValue =
  | SerializablePrimitiveValue
  | SerializablePrimitiveValue[]
  | Record<string, SerializablePrimitiveValue>
  | { toJSON(): SerializableValue };
