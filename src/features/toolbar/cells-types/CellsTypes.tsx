import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdOutline123, MdCurrencyRuble, MdPercent, MdCheck } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { DropdownMenu, DropdownMenuItem } from 'entities';
import { ANIMATION_DURATION } from 'shared/consts';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import styles from './CellsTypes.module.css';

interface ICellsTypesProps {
  fn?: any;
}

export const CellsTypes: FC<ICellsTypesProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.types}>
      <Title text="Денежный формат">
        <Button className={styles.button} Icon={MdCurrencyRuble} />
      </Title>

      <Title text="Процентный формат">
        <Button className={styles.button} Icon={MdPercent} />
      </Title>

      <div>
        <Title isStopShow={isShow} text="Другие форматы">
          <Button onClick={toggleDropdown} className={styles.button_123} Icon={MdOutline123} />
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
                <DropdownMenuItem onClick={closeDropdown} Icon={MdCheck} text="Число" />
                <DropdownMenuItem onClick={closeDropdown} Icon={MdCheck} text="Arial" />
                <DropdownMenuItem onClick={closeDropdown} Icon={MdCheck} text="Sans serif" />
              </DropdownMenu>
            </MDropdown>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
