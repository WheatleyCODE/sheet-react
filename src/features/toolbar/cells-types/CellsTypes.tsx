import { FC } from 'react';
import { MdOutline123, MdCurrencyRuble, MdPercent } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './CellsTypes.module.css';

interface ICellsTypesProps {
  fn?: any;
}

export const CellsTypes: FC<ICellsTypesProps> = () => {
  return (
    <div className={styles.types}>
      <Title text="Денежный формат">
        <Button className={styles.button} Icon={MdCurrencyRuble} />
      </Title>

      <Title text="Процентный формат">
        <Button className={styles.button} Icon={MdPercent} />
      </Title>

      <Title text="Другие форматы">
        <Button className={styles.button_123} Icon={MdOutline123} />
      </Title>
    </div>
  );
};
