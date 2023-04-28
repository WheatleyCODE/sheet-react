import { FC } from 'react';
import { MdAdd, MdDensitySmall } from 'react-icons/md';
import styles from './SheetFooter.module.css';
import { Button, Title } from 'shared/ui';

export const SheetFooter: FC = () => {
  return (
    <div className={styles.footer}>
      <Title text="Добавить лист">
        <Button Icon={MdAdd} />
      </Title>

      <Title text="Все листы">
        <Button Icon={MdDensitySmall} />
      </Title>

      <Title text="Перейти на Лист 1">
        <Button text="Лист 1" />
      </Title>
    </div>
  );
};
