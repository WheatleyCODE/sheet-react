import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { modalsActions } from 'widgets';
import { ListActions, ListsControllers, ToggleAside } from 'features';
import { useTypedSelector, useTypedDispatch, useActions } from 'shared';
import styles from './SheetsFooter.module.css';

export const SheetsFooter: FC = () => {
  const { id } = useParams();
  const { createList, changeCurrentList, copyList } = useActions();
  const { lists, currentListId } = useTypedSelector((state) => state.sheets);
  const dispatch = useTypedDispatch();

  const createListHandler = () => {
    if (!id) return;
    createList({ id });
  };

  const changeCurrentListHandler = async (newCurrentId: string) => {
    if (!id) return;
    changeCurrentList({ id, newCurrentId });
  };

  const copyListHandler = async (listId: string) => {
    if (!id) return;
    copyList({ id, listId });
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
          changeCurrentListId={changeCurrentListHandler}
          currentListId={currentListId}
          createList={createListHandler}
          lists={lists}
        />

        <div className={styles.margin5} />

        {lists.map(({ name, id }, i) => (
          <Fragment key={i}>
            <ListActions
              id={id}
              changeCurrentListId={changeCurrentListHandler}
              name={name}
              isActive={id === currentListId}
              isLast={lists.length === 1}
              copyList={copyListHandler}
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
