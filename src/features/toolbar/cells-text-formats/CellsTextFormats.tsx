import { FC } from 'react';
import { MdFormatBold, MdFormatItalic, MdStrikethroughS } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './CellsTextFormats.module.css';

interface CellsTextFormatsProps {
  fn?: any;
}

export const CellsTextFormats: FC<CellsTextFormatsProps> = () => {
  return (
    <div className={styles.formats}>
      <Title text="Полужирный">
        <Button className={styles.button} Icon={MdFormatBold} />
      </Title>

      <Title text="Курсив">
        <Button className={styles.button} Icon={MdFormatItalic} />
      </Title>

      <Title text="Зачеркнутый текст">
        <Button className={styles.button} Icon={MdStrikethroughS} />
      </Title>
    </div>
  );
};
