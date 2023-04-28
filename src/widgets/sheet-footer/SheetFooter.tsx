import { FC } from 'react';
import { MdAdd, MdFormatListBulleted } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import { ToggleAside } from 'features';
import styles from './SheetFooter.module.css';

export const SheetFooter: FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <Title text="Добавить лист">
          <Button Icon={MdAdd} />
        </Title>

        <Title text="Все листы">
          <Button Icon={MdFormatListBulleted} />
        </Title>

        <Title text="Перейти на Лист 1">
          <Button text="Лист 1" />
        </Title>
      </div>

      <ToggleAside />
    </div>
  );
};
