import { FC } from 'react';
import { MdRedo, MdUndo } from 'react-icons/md';
import { Button, Title } from 'shared/ui';
import styles from './ChangeLastActions.module.css';

interface IChangeLastActionsProps {
  undo?: () => void;
  redo?: () => void;
}

export const ChangeLastActions: FC<IChangeLastActionsProps> = () => {
  return (
    <div className={styles.actions}>
      <Title text="Отменить">
        <Button className={styles.button} Icon={MdUndo} />
      </Title>

      <Title text="Повторить">
        <Button className={styles.button} Icon={MdRedo} />
      </Title>
    </div>
  );
};
