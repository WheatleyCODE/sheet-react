import { SerializableValue, KVStorageEngine } from './interface';
import { LocalStorageEngine } from './local-storage-engine/localStorageEngine';

export function KVFactory(namespace: string, engine?: KVStorageEngine) {
  const eng = engine || new LocalStorageEngine();
  return new KVStorage(namespace, eng);
}

export class KVStorage {
  readonly namespace: string;
  readonly engine: KVStorageEngine;

  constructor(namespace: string, engine: KVStorageEngine) {
    this.namespace = namespace;
    this.engine = engine;
  }

  async get<T extends SerializableValue>(key: string): Promise<T | null> {
    const rawData = await this.engine.get(this.#getKey(key));
    return JSON.parse(rawData ?? 'null');
  }

  async set(key: string, value: SerializableValue): Promise<void> {
    return await this.engine.set(this.#getKey(key), JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    return await this.engine.remove(this.#getKey(key));
  }

  #getKey(key: string) {
    return `[[${this.namespace}-${key}]]`;
  }
}
