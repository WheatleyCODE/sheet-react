export interface IDataProvider<T> {
  get(query: unknown): Promise<T>;
  set<T>(data: unknown, query: unknown): Promise<T>;
}

export interface IDataProviderPeek<T> {
  peek(query: unknown): Promise<T>;
}

export interface IDataSyncProvider<T> {
  get(query: unknown): T;
  set<T>(data: unknown, query: unknown): T;
}
