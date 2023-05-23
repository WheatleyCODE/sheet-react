import { FC } from 'react';
import { MdOutlineFormatPaint } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './CellsView.module.css';

interface ICellsViewProps {
  copy?: () => void;
}

export const CellsView: FC<ICellsViewProps> = () => {
  return (
    <div className={styles.view}>
      <Title text="Копировать стили">
        <Button className={styles.button} Icon={MdOutlineFormatPaint} />
      </Title>
    </div>
  );
};
