import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdFormatColorText } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION, colors } from 'shared/consts';
import styles from './CellsTextColor.module.css';
import { PaletteList, PaletteListItem } from 'entities/index';

interface ICellsTextColorProps {
  fn?: any;
}

export const CellsTextColor: FC<ICellsTextColorProps> = () => {
  const { isShow, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <div className={styles.color}>
      <Title isStopShow={isShow} text="Цвет текста">
        <Button onClick={toggleDropdown} className={styles.button} Icon={MdFormatColorText} />
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
