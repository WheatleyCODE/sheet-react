import { FC, ReactNode } from 'react';
import { MdFormatColorReset } from 'react-icons/md';
import styles from './PaletteList.module.css';
import { Button, Title } from 'shared/ui';

interface PaletteListProps {
  children: ReactNode;
}

export const PaletteList: FC<PaletteListProps> = ({ children }) => {
  return (
    <div className={styles.list}>
      <div className={styles.title}>Выбрать цвет</div>
      {children}

      <div className={styles.reset}>
        <Button className={styles.button} Icon={MdFormatColorReset} text="Сбросить цвет" />
      </div>
    </div>
  );
};
