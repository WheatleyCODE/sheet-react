import { FC } from 'react';
import { MdArrowDropDown, MdCheck } from 'react-icons/md';
import { AnimatePresence } from 'framer-motion';
import { Button, MDropdown, Title } from 'shared/ui';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import styles from './FontFamily.module.css';
import { DropdownMenu, DropdownMenuItem } from 'entities/index';

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
            transition={{ duration: ANIMATION_DURATION * 1.5 }}
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
          >
            <DropdownMenu>
              <DropdownMenuItem onClick={closeDropdown} Icon={MdCheck} text="Roboto" />
              <DropdownMenuItem onClick={closeDropdown} Icon={MdCheck} text="Arial" />
              <DropdownMenuItem onClick={closeDropdown} Icon={MdCheck} text="Sans serif" />
            </DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
