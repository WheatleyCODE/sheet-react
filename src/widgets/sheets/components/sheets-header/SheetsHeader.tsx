import { ChangeEvent, FC, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Settings } from 'features';
import { MSpinner, Logo } from 'entities';
import { useDebounce, useTypedSelector, ANIMATION_DURATION, useActions } from 'shared';
import { Input, Title, useValidInput } from 'shared/ui';
import styles from './SheetsHeader.module.css';

export const SheetsHeader: FC = () => {
  const { name, id, isLoading } = useTypedSelector((state) => state.sheets);
  const { changeSheetsName } = useActions();

  const input = useValidInput('');

  useEffect(() => {
    input.changeValue(name);
  }, [id]);

  const changeName = useDebounce((value: string) => {
    changeSheetsName({ id, newName: value });
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
        <AnimatePresence>
          {isLoading && (
            <MSpinner
              className={styles.loader}
              text="Синхронизация..."
              initial={{
                opacity: 0.6,
                translateY: -80,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              exit={{
                opacity: 0.6,
                translateY: -80,
              }}
              transition={{ duration: ANIMATION_DURATION }}
            />
          )}
        </AnimatePresence>
        <Settings />
      </div>
    </div>
  );
};
