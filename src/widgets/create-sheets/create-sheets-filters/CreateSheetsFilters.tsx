import { FC } from 'react';
import { ListFilter } from 'features/index';
import styles from './CreateSheetsFilters.module.css';

export const CreateSheetsFilters: FC = () => {
  return (
    <div className={styles.filters}>
      <div className={styles.main}>
        <div className={styles.name}>Вчера</div>
        <div className={styles.filter_name}>По дате инзменения</div>
        <div className={styles.buttons}>
          <ListFilter />
        </div>
      </div>
    </div>
  );
};
