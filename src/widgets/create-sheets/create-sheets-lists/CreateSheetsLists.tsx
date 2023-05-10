import { FC } from 'react';
import styles from './CreateSheetsLists.module.css';
import { SheetsCard } from 'entities/index';

export const CreateSheetsLists: FC = () => {
  return (
    <div className={styles.lists}>
      <div className={styles.list}>
        <div className={styles.li}>
          <SheetsCard name="Новая таблица" date="26.06.2023" />
          <SheetsCard name="Старая таблица" date="26.06.2023" />
          <SheetsCard name="Трекер инвестиций" date="26.06.2023" />
          <SheetsCard name="План проекта" date="26.06.2023" />
          <SheetsCard name="Список дел" date="26.06.2023" />
        </div>
      </div>
    </div>
  );
};
