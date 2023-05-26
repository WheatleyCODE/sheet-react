export abstract class BaseSyncProvider {
  private static instance: BaseSyncProvider;

  constructor() {
    if (BaseSyncProvider.instance) return BaseSyncProvider.instance;
    BaseSyncProvider.instance = this;
  }
}
