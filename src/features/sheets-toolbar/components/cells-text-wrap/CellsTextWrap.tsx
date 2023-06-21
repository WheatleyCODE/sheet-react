import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdCheck, MdOutlineArrowDropDown, MdWrapText } from 'react-icons/md';
import { TbTextWrapDisabled, TbTextWrap } from 'react-icons/tb';
import { Button, MDropdown, Title, useDropdown } from 'shared/ui';
import { ANIMATION_DURATION } from 'shared/consts';
import { DropdownIconMenu, DropdownIconMenuItem, TextWraps } from 'entities';
import styles from './CellsTextWrap.module.css';

interface ICellsTextWrapProps {
  wrap: TextWraps;
  changeWrap: (wrap: TextWraps) => void;
}

export const CellsTextWrap: FC<ICellsTextWrapProps> = ({ wrap, changeWrap }) => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.wrap}>
      <Title isStopShow={isShow} text="Перенос текста">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdWrapText} SubIcon={MdOutlineArrowDropDown} />
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
              <DropdownIconMenuItem isActive={TextWraps.NO_WRAP === wrap} Icon={TbTextWrapDisabled} />
              <DropdownIconMenuItem isActive={TextWraps.SLICE === wrap} Icon={MdCheck} />
              <DropdownIconMenuItem isActive={TextWraps.WRAP === wrap} Icon={TbTextWrap} />
            </DropdownIconMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
