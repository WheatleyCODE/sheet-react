import { Nullable } from 'shared/types';

export interface IRequest {
  get<T>(): Promise<T>;
  set<T>(data: unknown): Promise<T>;

  addHeaders(headers: { [key: string]: string }): this;
}

export interface IRequestParams {
  headers?: { [key: string]: string };
  body?: any;
  engine?: IRequestEngine;
}

export interface IRequestEngine {
  request(url: string, params: any): RequestPromise<any>;
}

export interface RequestPromise<D = unknown> extends Promise<D> {
  data: Promise<Nullable<D>>;

  // todo Реализовать после "Своего RXJS"
  stream: any;
  emitter: any;
  [Symbol.asyncIterator](): any;
}
