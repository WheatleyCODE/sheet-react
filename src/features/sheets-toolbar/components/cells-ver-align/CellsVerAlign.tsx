import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  MdOutlineArrowDropDown,
  MdVerticalAlignBottom,
  MdVerticalAlignCenter,
  MdVerticalAlignTop,
} from 'react-icons/md';
import { DropdownIconMenu, DropdownIconMenuItem, VerticalAligns } from 'entities';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './CellsVerAlign.module.css';

interface ICellsVerAlignProps {
  align: VerticalAligns;
  changeAlign: (align: VerticalAligns) => void;
}

export const CellsVerAlign: FC<ICellsVerAlignProps> = ({ align, changeAlign }) => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.vertical}>
      <Title isStopShow={isShow} text="Выравнивание по вертикали">
        <Button
          onClick={toggleDropdown}
          className={styles.button}
          Icon={MdVerticalAlignBottom}
          SubIcon={MdOutlineArrowDropDown}
        />
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
              <DropdownIconMenuItem isActive={VerticalAligns.TOP === align} Icon={MdVerticalAlignTop} />
              <DropdownIconMenuItem isActive={VerticalAligns.CENTER === align} Icon={MdVerticalAlignCenter} />
              <DropdownIconMenuItem isActive={VerticalAligns.BOTTOM === align} Icon={MdVerticalAlignBottom} />
            </DropdownIconMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
