import { CellFormats, Fonts, HorizontalAligns, ICell, ICol, IRow, TextWraps, VerticalAligns } from 'shared/types/table';
import { toCharCode } from './toCharCode';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from 'shared/consts/table';

const createColData = (value: string, id: number): ICol => {
  return {
    id,
    value,
    width: DEFAULT_WIDTH,
  };
};

const createRowData = (value: number): IRow => {
  return {
    value: String(value),
    id: value,
    height: DEFAULT_HEIGHT,
  };
};

const createCellData = (id: string): ICell => {
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

export const createCols = (colsCount: number): ICol[] => {
  const toChar = toCharCode();
  return new Array(colsCount).fill('').map((_, i) => createColData(toChar(), i + 1));
};

export const createRows = (rowsCount: number): IRow[] => {
  return new Array(rowsCount).fill('').map((_, i) => createRowData(i + 1));
};

export const createCells = (rows: IRow[], colsCount: number): ICell[][] => {
  const colls: ICell[][] = [];

  for (let i = 0; i < rows.length; i++) {
    colls[i] = [];

    for (let j = 0; j < colsCount; j++) {
      colls[i].push(createCellData(`${i}:${j}`));
    }
  }

  return colls;
};

export const createTable = (colsCount = 30, rowsCount = 50) => {
  const cols = createCols(colsCount);
  const rows = createRows(rowsCount);
  const cells = createCells(rows, colsCount);

  return {
    cols,
    rows,
    cells,
  };
};
