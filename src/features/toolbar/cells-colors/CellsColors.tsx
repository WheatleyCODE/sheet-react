import { FC } from 'react';
import { MdFormatColorFill, MdFormatColorText } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './CellsColors.module.css';

interface ICellsColorsProps {
  fn?: any;
}

export const CellsColors: FC<ICellsColorsProps> = () => {
  return (
    <div className={styles.colors}>
      <Title text="Цвет текста">
        <Button className={styles.button} Icon={MdFormatColorText} />
      </Title>

      <Title text="Цвет заливки">
        <Button className={styles.button} Icon={MdFormatColorFill} />
      </Title>
    </div>
  );
};
