import { ChangeEvent, FC, useEffect } from 'react';
import { Logo } from 'entities/logo/Logo';
import { Input, Title } from 'shared/ui';
import { useValidInput } from 'shared/lib/hooks/useValidInput';
import { Settings } from 'features';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { sheetsActions } from 'widgets/sheets/store/sheetsSlice';
import styles from './SheetsHeader.module.css';

export const SheetsHeader: FC = () => {
  const { name, id } = useTypedSelector((state) => state.sheets);
  const dispatch = useTypedDispatch();

  const input = useValidInput('');

  useEffect(() => {
    input.changeValue(name);
  }, [id]);

  const changeName = useDebounce((value: string) => {
    dispatch(sheetsActions.changeName(value));
  }, 200);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    input.onChange(e);
    changeName(e.target.value);
  };

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
            onChange={onChange}
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
