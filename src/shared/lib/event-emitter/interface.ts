export interface IEventEmitterData {
  id: string;
  eventName: string;
  payload?: unknown;
}

export interface IEventEmitterSubs<D extends IEventEmitterData> {
  [id: string]: { [eventName: string]: Array<(data: D) => void> };
}
