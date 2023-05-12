import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdContentCopy, MdDeleteOutline, MdDriveFileRenameOutline, MdOutlineSettings } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/lib/hooks/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import styles from './ListActions.module.css';

interface ListActionsProps {
  name: string;
  isActive?: boolean;
}

export const ListActions: FC<ListActionsProps> = ({ name, isActive }) => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.actions}>
      <Title text={`Перейти на ${name}`}>
        <Button className={`${styles.button} ${isActive && styles.active}`} text={name} />
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
              <div className={styles.list}>
                <div className={styles.li}>
                  <div className={styles.icon}>
                    <MdDeleteOutline />
                  </div>
                  Удалить
                </div>
                <div className={styles.li}>
                  <div className={styles.icon}>
                    <MdContentCopy />
                  </div>
                  Копировать
                </div>
                <div className={styles.li}>
                  <div className={styles.icon}>
                    <MdDriveFileRenameOutline />
                  </div>
                  Переименовать
                </div>
              </div>
            </MDropdown>
          )}
        </AnimatePresence>
      </Title>
    </div>
  );
};
