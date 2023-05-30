import { LastActionsController } from './last-actions-req-local-engine/lastActionsController';
import { ILastActionsReqEngine } from './interface';

export function LastActionsReqServiceFactory(engine?: ILastActionsReqEngine): LastActionsReqService {
  return new LastActionsReqService(engine || new LastActionsController());
}

export class LastActionsReqService {
  readonly engine: ILastActionsReqEngine;

  constructor(engine: ILastActionsReqEngine) {
    this.engine = engine;
  }

  async getAction(id: string): Promise<any> {
    return await this.engine.getAction(id);
  }

  async getLastAction(count: number): Promise<any> {
    return await this.engine.getLastAction(count);
  }
}
