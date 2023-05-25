import { LastActionsService } from '../model/lastActionsService';

export class LastActionsController {
  #lastActionsSSService = new LastActionsService();

  async getAction(id: string): Promise<any> {
    return await this.#lastActionsSSService.getAction(id);
  }

  async getLastAction(count: number): Promise<any> {
    return await this.#lastActionsSSService.getLastActions(count);
  }
}

export const lastActionsController = new LastActionsController();
