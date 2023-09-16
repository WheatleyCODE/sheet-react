import { ICell, ICol, IRow } from 'entities/share';

export type SelectionRect = { width: number; height: number };
type ExistIds = { rowIds: { [key: string]: boolean }; colIds: { [key: string]: boolean } };

export const calcSelectionRect = (selectCells: ICell[], rows: IRow[], cols: ICol[]): SelectionRect => {
  const existIds: ExistIds = {
    colIds: {},
    rowIds: {},
  };

  let width = 0;
  let height = 0;

  for (const selectCell of selectCells) {
    const [rowId, colId] = selectCell.id.split(':').map((str) => Number(str));

    if (!existIds.rowIds[rowId]) {
      existIds.rowIds[rowId] = true;
      height += rows[rowId].height;
    }

    if (!existIds.colIds[colId]) {
      existIds.colIds[colId] = true;
      width += cols[colId].width;
    }
  }

  return {
    width,
    height,
  };
};

export const getIsSelectBorder = (selectCells: ICell[], cell: ICell) =>
  !!(selectCells[0]?.id === cell?.id) && selectCells.length > 1;

export const getIsActive = (selectCells: ICell[], cell: ICell, firstCell: ICell | null) =>
  !!(firstCell?.id === cell?.id) || (selectCells[0]?.id === cell?.id && selectCells.length <= 1);

export const getSelectionAreaRect = (selectCells: ICell[], cell: ICell, rows: IRow[], cols: ICol[]) =>
  selectCells[0]?.id === cell?.id ? calcSelectionRect(selectCells, rows, cols) : undefined;
