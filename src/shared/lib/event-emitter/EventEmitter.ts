import { IEventEmitterData, IEventEmitterSubs } from './interface';

export abstract class EventEmitter<D extends IEventEmitterData, N extends string> {
  #subscribers: IEventEmitterSubs<D> = {};
  private static instance: EventEmitter<any, any>;

  constructor() {
    if (EventEmitter.instance) return EventEmitter.instance;
    EventEmitter.instance = this;
  }

  subscribe(id: string, eventName: N, callback: (a: D) => void): () => void {
    if (!this.#subscribers[id]) this.#subscribers[id] = {};
    if (!this.#subscribers[id][eventName]) this.#subscribers[id][eventName] = [];

    this.#subscribers[id][eventName].push(callback);

    return () => {
      this.#subscribers[id][eventName] = this.#subscribers[id][eventName].filter((fn) => fn !== callback);
    };
  }

  emit(data: D): void {
    try {
      const { id, eventName } = data;
      this.#subscribers[id][eventName].forEach((callback) => callback(data));
    } catch (e) {
      console.warn('Вы не подписаны на данный ивент', data);
    }
  }
}
