import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './CellsFilters.module.css';

interface CellsFiltersProps {
  fn?: any;
}

export const CellsFilters: FC<CellsFiltersProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.filters}>
      <Title isStopShow={isShow} text="Добавить фильтр">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdOutlineFilterAlt} />
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
              <DropdownMenuItem text="Добавить фильтр" />
              <DropdownMenuItem text="Добавить фильтр" />
              <DropdownMenuItem text="Добавить фильтр" />
            </DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
