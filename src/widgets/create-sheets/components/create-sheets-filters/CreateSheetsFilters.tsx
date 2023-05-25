import { FC } from 'react';
import { ListFilter } from 'features';
import { useTypedSelector } from 'shared';
import { sheetsSortNames } from '../../consts/sheetsSorts';
import styles from './CreateSheetsFilters.module.css';

export const CreateSheetsFilters: FC = () => {
  const { currentSorter } = useTypedSelector((state) => state.createSheets);

  return (
    <div className={styles.filters}>
      <div className={styles.main}>
        <div className={styles.name}>Вчера</div>
        <div className={styles.filter_name}>
          Сортировка: <span>{sheetsSortNames[currentSorter]}</span>
        </div>
        <div className={styles.buttons}>
          <ListFilter currentSorter={currentSorter} />
        </div>
      </div>
    </div>
  );
};
