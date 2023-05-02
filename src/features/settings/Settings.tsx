import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/lib/hooks/useDropdown';
import styles from './Settings.module.css';

export const Settings: FC = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.settings}>
      <Title isStopShow={isShow} text="Настройки">
        <Button onClick={toggleDropdown} text="Настройки" />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            className={styles.dropdown}
            closeDropdown={closeDropdown}
            transition={{ duration: ANIMATION_DURATION * 1.5 }}
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
