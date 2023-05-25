import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdContentCopy, MdDeleteOutline, MdDriveFileRenameOutline, MdOutlineSettings } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown, ANIMATION_DURATION } from 'shared';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import styles from './ListActions.module.css';

interface ListActionsProps {
  name: string;
  isActive?: boolean;
  isLast: boolean;
  id: string;
  changeCurrentListId: (id: string) => Promise<void>;
  copyList: (listId: string) => Promise<void>;
  openRenameModal: (listId: string) => void;
  openDeleteModal: (listId: string) => void;
}

export const ListActions: FC<ListActionsProps> = (props) => {
  const { name, isActive, isLast, id, changeCurrentListId, openRenameModal, copyList, openDeleteModal } = props;
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  const changeCurrentListIdHandler = () => {
    changeCurrentListId(id);
  };

  const deleteListHandler = () => {
    openDeleteModal(id);
    closeDropdown();
  };

  const copyListHandler = async () => {
    await copyList(id);
    closeDropdown();
  };

  const renameListHandler = () => {
    openRenameModal(id);
    closeDropdown();
  };

  return (
    <div className={styles.actions}>
      <Title text={`Перейти на ${name}`}>
        <Button
          onClick={changeCurrentListIdHandler}
          className={`${styles.button} ${isActive && styles.active}`}
          text={name}
        />
      </Title>

      <Title isStopShow={isShow} text={`Параметры ${name}`}>
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdOutlineSettings} />

        <AnimatePresence>
          {isShow && (
            <MDropdown
              transition={{ duration: ANIMATION_DURATION }}
              exit={{ height: 0 }}
              animate={{ height: 'auto' }}
              initial={{ height: 0 }}
              className={styles.dropdown}
              closeDropdown={closeDropdown}
            >
              <DropdownMenu>
                <DropdownMenuItem
                  onClick={isLast ? undefined : deleteListHandler}
                  Icon={MdDeleteOutline}
                  className={isLast && styles.last}
                  text="Удалить"
                />
                <DropdownMenuItem onClick={copyListHandler} Icon={MdContentCopy} text="Копировать" />
                <DropdownMenuItem onClick={renameListHandler} Icon={MdDriveFileRenameOutline} text="Переименовать" />
              </DropdownMenu>
            </MDropdown>
          )}
        </AnimatePresence>
      </Title>
    </div>
  );
};
