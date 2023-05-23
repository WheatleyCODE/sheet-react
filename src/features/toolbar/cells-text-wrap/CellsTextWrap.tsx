import { FC } from 'react';
import { Button, MDropdown, Title } from 'shared/ui';
import { MdCheck, MdWrapText } from 'react-icons/md';
import styles from './CellsTextWrap.module.css';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { AnimatePresence } from 'framer-motion';
import { ANIMATION_DURATION } from 'shared/consts';
import { DropdownIconMenu, DropdownIconMenuItem } from 'entities/index';

interface ICellsTextWrapProps {
  fn?: any;
}

export const CellsTextWrap: FC<ICellsTextWrapProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.wrap}>
      <Title isStopShow={isShow} text="Перенос текста">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdWrapText} />
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
              <DropdownIconMenuItem Icon={MdCheck} />
              <DropdownIconMenuItem Icon={MdCheck} />
              <DropdownIconMenuItem Icon={MdCheck} />
            </DropdownIconMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
