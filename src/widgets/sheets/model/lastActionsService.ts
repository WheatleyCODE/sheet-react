import { KVFactory, SessionStorageEngine } from 'shared';

export class LastActionsService {
  #ss = KVFactory('actions', new SessionStorageEngine());

  getLastActions(count: number) {
    console.log(count);
  }

  async getAction(id: string) {
    const data = await this.#ss.get(id);

    if (!data) {
      throw new Error('Действие не найдено');
    }

    return data;
  }
}
