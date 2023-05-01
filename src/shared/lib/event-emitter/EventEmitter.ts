import { EventNames, EmitterData } from './interface';

export class EventEmitter {
  private subscribers: { [propName: string]: Array<(a: EmitterData) => void> } = {};
  private static instance: EventEmitter;

  constructor() {
    if (EventEmitter.instance) return EventEmitter.instance;
    EventEmitter.instance = this;
  }

  emit(arg: EmitterData): void {
    const { type } = arg;

    if (Array.isArray(this.subscribers[type])) {
      this.subscribers[type].forEach((callback) => callback(arg));
    }
  }

  subscribe(type: EventNames, callback: (a: EmitterData) => void): () => void {
    this.subscribers[type] = this.subscribers[type] || [];
    this.subscribers[type].push(callback);

    return () => {
      this.subscribers[type] = this.subscribers[type].filter((fn) => fn !== callback);
    };
  }
}
