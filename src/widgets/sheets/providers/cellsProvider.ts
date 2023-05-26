import { BaseProvider, IDataProvider, IDataProviderPeek } from 'shared';
import { RequestBuilder } from 'shared/lib/request/request-builder/requestBuilder';

// * PROTOTYPE | TEMPLATE
export class CellsBaseProvider extends BaseProvider {
  #normalizer: (a: any) => any;

  constructor(normalizer: (a: any) => any) {
    super();
    this.#normalizer = normalizer;
  }
}

export class CellsProvider extends CellsBaseProvider implements IDataProvider<any> {
  static request = new RequestBuilder('url', { headers: { 'Content-Length': '1934' } })
    .addHeaders({ 'Content-Type': 'application/json' })
    .build();

  constructor(normalizer: (a: any) => any) {
    super(normalizer);
  }

  get(query: unknown): Promise<any> {
    throw new Error('Method not implemented.');
  }

  set<T>(data: unknown, query: unknown): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

export class CellsPeekProvider extends CellsProvider implements IDataProviderPeek<any> {
  static request = CellsProvider.request.addHeaders({ 'My-Peek': 'json' });

  peek(query: unknown): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
