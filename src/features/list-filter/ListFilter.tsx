import { FC } from 'react';
import { Button, MDropdown, Title } from 'shared/ui';
import styles from './ListFilter.module.css';
import { MdCheck, MdOutlineFilterAlt } from 'react-icons/md';
import { useDropdown } from 'shared/lib/hooks/useDropdown';
import { AnimatePresence } from 'framer-motion';
import { ANIMATION_DURATION } from 'shared/consts/animate';

export const ListFilter: FC = () => {
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();

  return (
    <div className={styles.filter}>
      <Title isStopShow={isShow} text="Сортировка">
        <Button text="Сортировка" onClick={toggleDropdown} className={styles.button} Icon={MdOutlineFilterAlt} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            closeDropdown={closeDropdown}
            className={styles.dropdown}
          >
            <div className={styles.list}>
              <div className={styles.li}>
                <div className={styles.icon}>
                  <MdCheck />
                </div>
                По дате просмотра
              </div>
              <div className={styles.li}>
                <div className={styles.icon}>
                  <MdCheck />
                </div>
                По дате изменения
              </div>
              <div className={styles.li}>
                <div className={styles.icon}>
                  <MdCheck />
                </div>
                По названию
              </div>
            </div>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
