import { FC } from 'react';
import { MdBorderAll } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './CellsBorder.module.css';

interface CellsBorderProps {
  fn?: any;
}

export const CellsBorder: FC<CellsBorderProps> = () => {
  return (
    <div className={styles.border}>
      <Title text="Границы">
        <Button className={styles.button} Icon={MdBorderAll} />
      </Title>
    </div>
  );
};
