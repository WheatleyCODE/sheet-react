export abstract class BaseProvider {
  private static instance: BaseProvider;

  constructor() {
    if (BaseProvider.instance) return BaseProvider.instance;
    BaseProvider.instance = this;
  }
}
