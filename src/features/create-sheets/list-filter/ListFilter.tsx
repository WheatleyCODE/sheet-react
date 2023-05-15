import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, MDropdown, Title } from 'shared/ui';
import { MdCheck, MdChevronLeft, MdOutlineFilterAlt } from 'react-icons/md';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import styles from './ListFilter.module.css';

export const ListFilter: FC = () => {
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();
  const [isHidden, setIsHidden] = useState(false);

  const onMouseEnter = () => {
    setIsHidden(true);
  };

  const closeDropdownHandler = () => {
    setIsHidden(false);
    closeDropdown();
  };

  return (
    <div className={styles.filter}>
      <Title isStopShow={isShow} text="Сортировка">
        <Button text="Сортировка" onClick={toggleDropdown} className={styles.button} Icon={MdOutlineFilterAlt} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            onMouseEnter={onMouseEnter}
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            closeDropdown={closeDropdownHandler}
            className={`${styles.dropdown} ${isHidden && styles.visible}`}
          >
            <DropdownMenu>
              <DropdownMenuItem onClick={closeDropdownHandler} Icon={MdCheck} text="По названию"></DropdownMenuItem>
              <DropdownMenuItem Icon={MdChevronLeft} text="По дате">
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
