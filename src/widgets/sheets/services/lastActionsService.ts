import { LastActionsSSService } from '../model/lastActionsSSService';

export class LastActionsService {
  #lastActionsSSService = new LastActionsSSService();

  async getAction(id: string): Promise<any> {
    return await this.#lastActionsSSService.getAction(id);
  }

  async getLastAction(count: number): Promise<any> {
    return await this.#lastActionsSSService.getLastActions(count);
  }
}

export const lastActionsService = new LastActionsService();
