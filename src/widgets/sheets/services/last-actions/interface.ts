export interface ILastActionsReqEngine {
  getAction(id: string): Promise<any>;
  getLastAction(count: number): Promise<any>;
}
