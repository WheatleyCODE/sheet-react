import { FC } from 'react';
import { Button, Title } from 'shared/ui';
import { MdFormatAlignLeft, MdVerticalAlignBottom, MdWrapText } from 'react-icons/md';
import styles from './CellsFormats.module.css';

interface ICellsFormatsProps {
  fn?: any;
}

export const CellsFormats: FC<ICellsFormatsProps> = () => {
  return (
    <div className={styles.formats}>
      <Title text="Выравнивание по горизонтали">
        <Button className={styles.button} Icon={MdFormatAlignLeft} />
      </Title>

      <Title text="Выравнивание по вертикали">
        <Button className={styles.button} Icon={MdVerticalAlignBottom} />
      </Title>

      <Title text="Перенос текста">
        <Button className={styles.button} Icon={MdWrapText} />
      </Title>
    </div>
  );
};
