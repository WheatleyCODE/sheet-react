import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdAdd, MdCheck, MdFormatListBulleted } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { IList } from 'widgets/sheetsSlice';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import styles from './ListsControllers.module.css';

interface IListsControllersProps {
  lists: IList[];
}

export const ListsControllers: FC<IListsControllersProps> = ({ lists }) => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.controllers}>
      <Title text="Добавить лист">
        <Button className={styles.button} Icon={MdAdd} />
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
              <div className={styles.list}>
                {lists.map(({ name }) => (
                  <div className={styles.li}>
                    <div className={styles.icon}>
                      <MdCheck />
                    </div>
                    {name}
                  </div>
                ))}
              </div>
            </MDropdown>
          )}
        </AnimatePresence>
      </Title>
    </div>
  );
};
