export enum CellFormats {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  PERCENT = 'PERCENT',
  CURRENCY = 'CURRENCY',
  DATE = 'DATE',
  TIME = 'TIME',
}

export enum Fonts {
  ROBOTO = 'Roboto',
  ARIAL = 'Arial',
}

export enum HorizontalAligns {
  CENTER = 'center',
  RIGHT = 'right',
  LEFT = 'left',
}

export enum VerticalAligns {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum TextWraps {
  NO_WRAP = 'NO_WRAP',
  WRAP = 'WRAP',
  SLICE = 'SLICE',
}

export interface IBorder {
  value: string;
}

export interface IFilter {
  value: string;
}

export interface IMerge {
  value: string;
}

export interface ICell {
  value: string;
  id: string;
  format: CellFormats;
  font: Fonts;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  isStroke: boolean;
  textColor: string;
  backgroundColor: string;
  border: IBorder;
  verticalAlign: VerticalAligns;
  horizontalAlign: HorizontalAligns;
  textWrap: TextWraps;
  merge: IMerge;
  link: string | null;
  formula: string | null;
  filter: IFilter;
}

export interface ICol {
  id: number;
  value: string;
  width: number;
}

export interface IRow {
  id: number;
  value: string;
  height: number;
}
