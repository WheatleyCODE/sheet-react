import { BaseProvider, IDataProvider, IDataProviderPeek } from 'shared';

// * PROTOTYPE | TEMPLATE
export class CellsBaseProvider extends BaseProvider {
  #normalizer: (a: any) => any;

  constructor(normalizer: (a: any) => any) {
    super();
    this.#normalizer = normalizer;
  }
}

export class CellsProvider extends CellsBaseProvider implements IDataProvider<any> {
  // static request = requestBuilder({ headers: { 'Content-Type': 'application/json' } });
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
  // ! И все должно склеиться
  // static request = CellsProvider.request({ headers: { 'my-peek-header': 'hello' } });

  peek(query: unknown): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

// todo Создать requestBuilder
