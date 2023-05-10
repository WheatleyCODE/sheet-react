import { FC } from 'react';
import styles from './CreateSheetsLists.module.css';
import { SheetsCard } from 'entities/index';

export const CreateSheetsLists: FC = () => {
  return (
    <div className={styles.lists}>
      <div className={styles.list}>
        <div className={styles.li}>
          <SheetsCard name="Новая карта" date="26.06.2023" />
          <SheetsCard name="Новая карта" date="26.06.2023" />
          <SheetsCard name="Новая карта" date="26.06.2023" />
          <SheetsCard name="Новая карта" date="26.06.2023" />
          <SheetsCard name="Новая карта" date="26.06.2023" />
        </div>
      </div>
    </div>
  );
};
