import { IRequest, IRequestParams } from '../request/interface';
import { Request } from '../request/request';

// * PROTOTYPE | TEMPLATE
export class RequestBuilder {
  #request: IRequest;

  constructor(url: string, params?: IRequestParams) {
    this.#request = new Request(url, params);
  }

  addHeaders(headers: { [key: string]: string }) {
    this.#request.addHeaders(headers);
    return this;
  }

  build(): IRequest {
    return this.#request;
  }
}
