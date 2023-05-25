import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { modalsActions } from 'widgets';
import { ListActions, ListsControllers, ToggleAside } from 'features';
import { tableController } from '../../controllers/tableController';
import { createTable } from '../../helpers/createTable';
import { tableActions } from '../../store/tableSlice';
import { sheetsActions } from '../../store/sheetsSlice';
import { sheetsController } from '../../controllers/sheetsController';
import { useTypedSelector, useTypedDispatch } from 'shared';
import { COLS_COUNT, ROWS_COUNT } from 'entities';
import styles from './SheetsFooter.module.css';

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

    tableController.createTable(tableId, cells);

    await sheetsController.addList(id, tableId, newList);
  };

  const changeCurrentListId = async (listId: string) => {
    dispatch(sheetsActions.changeCurrentListId(listId));

    const currentList = lists.find((list) => list.id === listId);
    if (!currentList) return;

    const cells = await tableController.getTable(currentList.id);

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

    tableController.deleteTable(listId);

    dispatch(sheetsActions.removeList(listId));

    await sheetsController.removeList(id, listId);
  };

  const copyList = async (listId: string) => {
    console.log(listId);
  };

  const renameList = async (listId: string) => {
    console.log(listId);
  };

  const openDeleteModal = (id: string) => {
    dispatch(modalsActions.changeDeleteList({ isShow: true, id }));
  };

  const openRenameModal = (id: string) => {
    dispatch(modalsActions.changeRenameList({ isShow: true, id }));
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
              copyList={copyList}
              openDeleteModal={openDeleteModal}
              openRenameModal={openRenameModal}
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
