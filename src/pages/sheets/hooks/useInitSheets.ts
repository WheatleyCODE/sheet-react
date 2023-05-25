import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import {
  createSheetsState,
  sheetsActions,
  sheetsController,
  tableActions,
  tableController,
  createTable,
} from 'widgets';
import { useTypedDispatch } from 'shared';
import { COLS_COUNT, ROWS_COUNT } from 'entities';

export const useInitSheets = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const initSheets = async () => {
      if (!id) return;
      const sheets = await sheetsController.getSheets(id);

      if (sheets) {
        const currentTable = sheets.lists.find((list) => list.id === sheets.currentListId);
        if (!currentTable) return;

        const cells = await tableController.getTable(currentTable.id);

        dispatch(sheetsActions.initSheets(sheets));
        dispatch(
          tableActions.initTable({
            cols: currentTable.cols,
            rows: currentTable.rows,
            cells,
            id: sheets.currentListId,
          })
        );

        return;
      }

      const { cols, rows, cells } = createTable(COLS_COUNT, ROWS_COUNT);
      const tableId = v4();

      const sheetsData = createSheetsState(id, tableId, cols, rows);

      dispatch(tableActions.initTable({ cols, rows, cells, id: tableId }));
      dispatch(sheetsActions.initSheets(sheetsData));

      tableController.createTable(tableId, cells);

      await sheetsController.setSheets(id, sheetsData);
    };

    initSheets();
  }, []);
};
