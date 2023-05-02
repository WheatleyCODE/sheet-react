import { FC } from 'react';
import { Logo } from 'entities/Logo/Logo';
import { Input, Title } from 'shared/ui';
import { useValidInput } from 'shared/lib/hooks/useValidInput';
import { Settings } from 'features';
import styles from './SheetHeader.module.css';

export const SheetHeader: FC = () => {
  const input = useValidInput('Новая таблица');

  return (
    <div className={styles.header}>
      <Title text="Главная страница Таблиц">
        <Logo />
      </Title>

      <div className={styles.name}>
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
          />
        </Title>
      </div>

      <div className={styles.settings}>
        <Settings />
      </div>
    </div>
  );
};
