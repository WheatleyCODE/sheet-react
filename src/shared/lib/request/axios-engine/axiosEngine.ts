import { IRequestEngine, RequestPromise } from '../request/interface';

// * PROTOTYPE | TEMPLATE
export class AxiosEngine implements IRequestEngine {
  request(url: string, params: any): RequestPromise<any> {
    throw new Error('Method not implemented.');
  }
}
