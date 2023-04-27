import { CanPromise, Nullable } from 'shared/types/utils';
import { KVStorageEngine } from '../interface';

export class SessionStorageEngine implements KVStorageEngine {
  get(key: string): CanPromise<Nullable<string>> {
    return sessionStorage.getItem(key);
  }

  set(key: string, value: string): CanPromise<void> {
    return sessionStorage.setItem(key, value);
  }

  remove(key: string): CanPromise<void> {
    return sessionStorage.removeItem(key);
  }
}
