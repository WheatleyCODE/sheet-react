import { FC } from 'react';
import { MdFunctions, MdOutlineFilterAlt } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './CellsFunctions.module.css';

interface CellsFunctionsProps {
  fn?: any;
}

export const CellsFunctions: FC<CellsFunctionsProps> = () => {
  return (
    <div className={styles.functions}>
      <Title text="Добавить фильтр">
        <Button className={styles.button} Icon={MdOutlineFilterAlt} />
      </Title>

      <Title text="Функции">
        <Button className={styles.button} Icon={MdFunctions} />
      </Title>
    </div>
  );
};
