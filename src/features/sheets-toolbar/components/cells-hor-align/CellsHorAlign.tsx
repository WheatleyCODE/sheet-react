import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, MDropdown, Title } from 'shared/ui';
import { MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight, MdOutlineArrowDropDown } from 'react-icons/md';
import { DropdownIconMenu, DropdownIconMenuItem, HorizontalAligns } from 'entities';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './CellsHorAlign.module.css';

interface ICellsHorAlignProps {
  align: HorizontalAligns;
  changeAlign: (align: HorizontalAligns) => void;
}

export const CellsHorAlign: FC<ICellsHorAlignProps> = ({ align, changeAlign }) => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.horizontal}>
      <Title isStopShow={isShow} text="Выравнивание по горизонтали">
        <Button
          onClick={toggleDropdown}
          className={styles.button}
          Icon={MdFormatAlignLeft}
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
              <DropdownIconMenuItem isActive={HorizontalAligns.LEFT === align} Icon={MdFormatAlignLeft} />
              <DropdownIconMenuItem isActive={HorizontalAligns.CENTER === align} Icon={MdFormatAlignCenter} />
              <DropdownIconMenuItem isActive={HorizontalAligns.RIGHT === align} Icon={MdFormatAlignRight} />
            </DropdownIconMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
