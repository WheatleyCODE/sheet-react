import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdFormatColorText } from 'react-icons/md';
import { Button, MDropdown, Title } from 'shared/ui';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import styles from './CellsTextColor.module.css';
import { PaletteList, PaletteListItem } from 'entities/index';
import { colors } from 'entities/share/consts/colors';

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
            exit={{ height: 0, opacity: 0.9 }}
            animate={{ height: 'auto', opacity: 1 }}
            initial={{ height: 0, opacity: 0.9 }}
          >
            <PaletteList>
              {colors.map((color) => (
                <PaletteListItem key={color.title} title={color.title} color={color.color} />
              ))}
            </PaletteList>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
