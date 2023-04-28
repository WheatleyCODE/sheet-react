import { FC } from 'react';
import styles from './SheetToolbar.module.css';

export const SheetToolbar: FC = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.main}></div>
    </div>
  );
};
