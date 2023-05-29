export interface ITableFields {
  tableId: string;
}

export interface ITableChangeCellValue extends ITableFields {
  id: string;
  value: string;
}
