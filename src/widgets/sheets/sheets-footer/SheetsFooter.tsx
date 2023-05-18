import { FC, Fragment } from 'react';
import { ListActions, ListsControllers, ToggleAside } from 'features';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import styles from './SheetsFooter.module.css';
import { tableService } from '../services/tableService';
import { createTable } from '../helpers/createTable';
import { COLS_COUNT, ROWS_COUNT } from 'shared/consts';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { tableActions } from '../store/tableSlice';
import { sheetsActions } from '../store/sheetsSlice';
import { sheetsService } from '../services/sheetsService';

export const SheetsFooter: FC = () => {
  const { id } = useParams();
  const { lists, currentListId } = useTypedSelector((state) => state.sheets);
  const dispatch = useTypedDispatch();

  // ! Duplicate
  const createList = async () => {
    if (!id) return;

    const { cols, rows, cells } = createTable(COLS_COUNT, ROWS_COUNT);
    const tableId = v4();

    const newList = { name: `Лист ${lists.length + 1}`, id: tableId, cols, rows };

    dispatch(tableActions.initTable({ cols, rows, cells, id: tableId }));
    dispatch(sheetsActions.addList(newList));

    tableService.createTable(tableId, cells);

    await sheetsService.addList(id, tableId, newList);
  };

  const changeCurrentListId = async (listId: string) => {
    dispatch(sheetsActions.changeCurrentListId(listId));

    const currentList = lists.find((list) => list.id === listId);
    if (!currentList) return;

    const cells = await tableService.getTable(currentList.id);

    dispatch(
      tableActions.initTable({
        cols: currentList.cols,
        rows: currentList.rows,
        cells,
        id: listId,
      })
    );
  };

  const deleteList = async (listId: string) => {
    if (!id) return;

    if (listId === currentListId) {
      await changeCurrentListId(lists[0].id);
    }

    tableService.deleteTable(listId);

    dispatch(sheetsActions.removeList(listId));

    await sheetsService.removeList(id, listId);
  };

  const copyList = async (listId: string) => {
    console.log(listId);
  };

  const renameList = async (listId: string) => {
    console.log(listId);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <ListsControllers
          changeCurrentListId={changeCurrentListId}
          currentListId={currentListId}
          createList={createList}
          lists={lists}
        />

        <div className={styles.margin5} />

        {lists.map(({ name, id }, i) => (
          <Fragment key={i}>
            <ListActions
              id={id}
              changeCurrentListId={changeCurrentListId}
              name={name}
              isActive={id === currentListId}
              isLast={lists.length === 1}
              deleteList={deleteList}
              copyList={copyList}
              renameList={renameList}
            />
            <div className={styles.margin5} />
          </Fragment>
        ))}
      </div>

      <div className={styles.right}>
        <ToggleAside />
      </div>
    </div>
  );
};
