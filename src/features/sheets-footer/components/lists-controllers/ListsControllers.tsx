import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdAdd, MdCheck, MdFormatListBulleted } from 'react-icons/md';
import { Button, MDropdown, Title, useDropdown } from 'shared/ui';
import { ANIMATION_DURATION } from 'shared';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import styles from './ListsControllers.module.css';

// ! Fix
import { IList } from 'widgets/sheets/store/sheets/sheetsSlice';

interface IListsControllersProps {
  lists: IList[];
  createList: () => void;
  currentListId: string | null;
  changeCurrentListId: (ids: string) => Promise<void>;
}

export const ListsControllers: FC<IListsControllersProps> = (props) => {
  const { lists, createList, currentListId, changeCurrentListId } = props;
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  const changeCurrentListIdHandler = async (id: string) => {
    await changeCurrentListId(id);
    closeDropdown();
  };

  return (
    <div className={styles.controllers}>
      <Title text="Добавить лист">
        <Button onClick={createList} className={styles.button} Icon={MdAdd} />
      </Title>

      <Title isStopShow={isShow} text="Все листы">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdFormatListBulleted} />

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
                {lists.map(({ name, id }) => (
                  <DropdownMenuItem
                    key={id}
                    onClick={() => changeCurrentListIdHandler(id)}
                    Icon={currentListId === id ? MdCheck : 'NONE'}
                    text={name}
                  />
                ))}
              </DropdownMenu>
            </MDropdown>
          )}
        </AnimatePresence>
      </Title>
    </div>
  );
};
