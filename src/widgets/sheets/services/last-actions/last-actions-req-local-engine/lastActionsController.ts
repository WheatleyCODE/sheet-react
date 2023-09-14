import { ICell } from 'entities/share';
import { LastActionsService } from 'widgets/sheets/models/lastActionsService';

export class LastActionsController {
  #lastActionsSSService = new LastActionsService();

  async setUndoAction(cell: ICell): Promise<void> {
    return await this.#lastActionsSSService.setUndoAction(cell);
  }

  async getUndoAction(): Promise<ICell | null> {
    return await this.#lastActionsSSService.getUndoAction();
  }

  async getRedoAction(): Promise<ICell | null> {
    return await this.#lastActionsSSService.getRedoAction();
  }

  async getAction(id: string): Promise<ICell | null> {
    return await this.#lastActionsSSService.getAction(id);
  }
}
