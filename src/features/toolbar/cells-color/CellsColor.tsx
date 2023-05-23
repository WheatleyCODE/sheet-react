import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdFormatColorFill } from 'react-icons/md';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { Button, MDropdown, Title } from 'shared/ui';
import { ANIMATION_DURATION, colors } from 'shared/consts';
import styles from './CellsColor.module.css';
import { PaletteList, PaletteListItem } from 'entities/index';

interface ICellsColorProps {
  fn?: any;
}

export const CellsColor: FC<ICellsColorProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.colors}>
      <Title isStopShow={isShow} text="Цвет заливки">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdFormatColorFill} />
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
            <PaletteList>
              {colors.map((color) => (
                <PaletteListItem key={color.title} color={color.color} />
              ))}
            </PaletteList>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
