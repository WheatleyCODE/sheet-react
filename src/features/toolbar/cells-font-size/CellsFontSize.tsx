import { FC } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './CellsFontSize.module.css';

interface ICellsFontSizeProps {
  fn?: any;
}

export const CellsFontSize: FC<ICellsFontSizeProps> = () => {
  return (
    <div className={styles.font_size}>
      <Title text="Уменьшить размер шрифта">
        <Button className={styles.button} Icon={MdRemove} />
      </Title>

      <Title text="Размер шрифта">
        <input value={10} className={styles.input} type="text" />
      </Title>

      <Title text="Увеличить размер шрифта">
        <Button className={styles.button} Icon={MdAdd} />
      </Title>
    </div>
  );
};
