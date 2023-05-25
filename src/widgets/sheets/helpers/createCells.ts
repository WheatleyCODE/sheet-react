import {
  CellFormats,
  Fonts,
  HorizontalAligns,
  ICell,
  ICol,
  IRow,
  TextWraps,
  VerticalAligns,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
} from 'entities';

export const createColData = (value: string, id: number): ICol => {
  return {
    id,
    value,
    width: DEFAULT_WIDTH,
  };
};

export const createRowData = (value: number): IRow => {
  return {
    value: String(value),
    id: value,
    height: DEFAULT_HEIGHT,
  };
};

export const createCellData = (id: string): ICell => {
  return {
    value: '',
    id,
    format: CellFormats.STRING,
    font: Fonts.ROBOTO,
    fontSize: 14,
    isBold: false,
    isItalic: false,
    isStroke: false,
    textColor: '#000',
    backgroundColor: '#fafafa',
    border: { value: '' },
    verticalAlign: VerticalAligns.CENTER,
    horizontalAlign: HorizontalAligns.CENTER,
    textWrap: TextWraps.NO_WRAP,
    merge: { value: '' },
    link: null,
    formula: null,
    filter: { value: '' },
  };
};
