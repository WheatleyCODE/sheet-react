import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdFunctions } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './CellsFunctions.module.css';

interface CellsFunctionsProps {
  fn?: any;
}

export const CellsFunctions: FC<CellsFunctionsProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.functions}>
      <Title isStopShow={isShow} text="Функции">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdFunctions} />
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
            <DropdownMenu>
              <DropdownMenuItem text="Добавить функцию" />
              <DropdownMenuItem text="Добавить функцию" />
              <DropdownMenuItem text="Добавить функцию" />
              <DropdownMenuItem text="Добавить функцию" />
            </DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
