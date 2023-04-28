import { FC } from 'react';
import { Logo } from 'entities/Logo/Logo';
import { Button, Input, Title } from 'shared/ui';
import { useValidInput } from 'shared/lib/hooks/useValidInput';
import styles from './SheetHeader.module.css';

export const SheetHeader: FC = () => {
  const input = useValidInput('Новая таблица');

  return (
    <div className={styles.header}>
      <Title text="Главная страница Таблиц">
        <Logo />
      </Title>

      <div className={styles.settings}>
        <Title text="Переименовать">
          <Input
            value={input.value}
            type="text"
            placeholder="Название таблицы"
            onChange={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            isError={input.isError}
            validError={input.validError}
            isActive={input.isActive}
            changeFocus={input.changeFocus}
            changeActive={input.changeActive}
          />
        </Title>
      </div>

      <div className={styles.user}>
        <Title text="Аккаунт">
          <Button text="Google" />
        </Title>
      </div>
    </div>
  );
};
