import { useState } from 'react';
import { ICell } from 'entities/share';

let isMouseDown = false;
let selCells: ICell[] = [];

export const usePreSelect = (cells: ICell[][], selectCells: ICell[]) => {
  const [preSelectedCells, setPreSelectedCells] = useState<ICell[]>([]);
  const [firstCell, setFirstCell] = useState<ICell | null>(null);

  selCells = selectCells;

  const preSelectHandler = (id: string) => {
    if (!isMouseDown) return;

    const ids = id.split(':').map((str) => Number(str));
    const firstCell = selCells[0];
    const lastCell = cells[ids[0]][ids[1]];

    setFirstCell(firstCell);

    const [rowFirstId, colFirstId] = firstCell.id.split(':').map((str) => Number(str));
    const [rowLastId, colLastId] = lastCell.id.split(':').map((str) => Number(str));
    const preselectCells: ICell[] = [];

    const sortCallBack = (a: number, b: number) => (a < b ? 1 : -1);

    const [maxCol, minCol] = [colFirstId, colLastId].sort(sortCallBack);
    const [maxRow, minRow] = [rowFirstId, rowLastId].sort(sortCallBack);

    for (let i = minCol; i <= maxCol; i += 1) {
      for (let j = minRow; j <= maxRow; j += 1) {
        const cell = cells[j][i];
        if (cell) preselectCells.push(cell);
      }
    }

    setPreSelectedCells([...preselectCells]);
  };

  const onMouseDown = () => {
    isMouseDown = true;
    setPreSelectedCells([]);
    setFirstCell(null);
  };

  const onMouseUp = () => {
    isMouseDown = false;
    if (preSelectedCells.length <= 0) return false;
    setPreSelectedCells([]);
    return true;
  };

  return {
    preSelectedCells,
    preSelectHandler,
    onMouseDown,
    onMouseUp,
    firstCell,
  };
};
