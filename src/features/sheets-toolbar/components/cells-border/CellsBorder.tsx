import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  MdBorderAll,
  MdBorderBottom,
  MdBorderClear,
  MdBorderLeft,
  MdBorderOuter,
  MdBorderRight,
  MdBorderTop,
} from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { DropdownIconMenu, DropdownIconMenuItem } from 'entities';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './CellsBorder.module.css';

interface CellsBorderProps {
  fn?: any;
}

export const CellsBorder: FC<CellsBorderProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.border}>
      <Title isStopShow={isShow} text="Границы">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdBorderAll} />
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
            <DropdownIconMenu>
              <DropdownIconMenuItem Icon={MdBorderAll} />
              <DropdownIconMenuItem Icon={MdBorderOuter} />
              <DropdownIconMenuItem Icon={MdBorderLeft} />
              <DropdownIconMenuItem Icon={MdBorderBottom} />
              <DropdownIconMenuItem Icon={MdBorderRight} />
              <DropdownIconMenuItem Icon={MdBorderTop} />
              <DropdownIconMenuItem Icon={MdBorderClear} />
            </DropdownIconMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
