import { CanPromise, Nullable } from 'shared/types/utils';
import { KVStorageEngine } from '../interface';

export class LocalStorageEngine implements KVStorageEngine {
  get(key: string): CanPromise<Nullable<string>> {
    return localStorage.getItem(key);
  }

  set(key: string, value: string): CanPromise<void> {
    return localStorage.setItem(key, value);
  }

  remove(key: string): CanPromise<void> {
    return localStorage.removeItem(key);
  }
}
