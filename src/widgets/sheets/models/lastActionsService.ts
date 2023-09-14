import { ICell } from 'entities/share';
import { KVFactory, SessionStorageEngine } from 'shared';

export class LastActionsService {
  #ss = KVFactory('actions', new SessionStorageEngine());

  async setUndoAction(cell: ICell): Promise<void> {
    return;
  }

  async getAction(id: string): Promise<ICell | null> {
    return null;
  }

  async getUndoAction(): Promise<ICell | null> {
    return null;
  }

  async getRedoAction(): Promise<ICell | null> {
    return null;
  }
}
