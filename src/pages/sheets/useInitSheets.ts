import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { createTable } from 'widgets/sheets/helpers/createTable';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { createSheetsState, sheetsActions, sheetsService, tableActions, tableService } from 'widgets/index';
import { COLS_COUNT, ROWS_COUNT } from 'shared/consts';

export const useInitSheets = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const initSheets = async () => {
      if (!id) return;
      const sheets = await sheetsService.getSheets(id);

      if (sheets) {
        const currentTable = sheets.lists.find((list) => list.id === sheets.currentListId);
        if (!currentTable) return;

        const cells = await tableService.getTable(currentTable.id);

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

      tableService.createTable(tableId, cells);

      await sheetsService.setSheets(id, sheetsData);
    };

    initSheets();
  }, []);
};
