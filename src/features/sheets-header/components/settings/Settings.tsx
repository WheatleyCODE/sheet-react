import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { ANIMATION_DURATION } from 'shared';
import { Button, MDropdown, Title, useDropdown, useDropdownSubMenuAnimationFixer } from 'shared/ui';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import styles from './Settings.module.css';

export const Settings: FC = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closeDropdown);

  return (
    <div className={styles.settings}>
      <Title isStopShow={isShow} text="Настройки">
        <Button onClick={toggleDropdown} text="Настройки" />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            onMouseEnter={onMouseEnter}
            className={styles.dropdown}
            style={overflowStyles}
            closeDropdown={closeDropdownHandler}
            transition={{ duration: ANIMATION_DURATION * 1.5 }}
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
          >
            <DropdownMenu>
              <DropdownMenuItem onClick={closeDropdownHandler} Icon={MdCheck} text="Сделать что-то" />
              <DropdownMenuItem onClick={closeDropdownHandler} Icon={MdCheck} text="Сделать другое" />
              <DropdownMenuItem Icon={MdChevronLeft} text="Выбрать что-то">
                <DropdownMenu>
                  <DropdownMenuItem onClick={closeDropdownHandler} Icon={MdCheck} text="По дате изменения" />
                  <DropdownMenuItem onClick={closeDropdownHandler} Icon={MdCheck} text="По дате просмотра" />
                  <DropdownMenuItem onClick={closeDropdownHandler} Icon={MdCheck} text="По дате создания" />
                </DropdownMenu>
              </DropdownMenuItem>
            </DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
