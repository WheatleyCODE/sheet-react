import { FC } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { Button, MDropdown, Title } from 'shared/ui';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import { useDropdown } from 'shared/lib/hooks/useDropdown';
import styles from './FontFamily.module.css';

export const FontFamily: FC = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.font_family}>
      <Title isStopShow={isShow} text="Изменить шрифт">
        <Button className={styles.button} onClick={toggleDropdown} text="Шрифт" Icon={MdArrowDropDown} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            className={styles.dropdown}
            closeDropdown={closeDropdown}
            transition={{ duration: ANIMATION_DURATION }}
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
          >
            <div className={styles.menu}>
              <h1>ADD MENU</h1>
            </div>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
