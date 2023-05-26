import { IRequest, IRequestEngine, IRequestParams, RequestPromise } from './interface';
import { FetchEngine } from '../fetch-engine/fetchEngine';

// * PROTOTYPE | TEMPLATE
export class Request implements IRequest {
  url: string;

  constructor(url: string, params?: IRequestParams) {
    this.url = url;
  }

  get<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  set<T>(data: unknown): Promise<T> {
    throw new Error('Method not implemented.');
  }

  addHeaders(headers: { [key: string]: string }): this {
    throw new Error('Method not implemented.');
  }
}
