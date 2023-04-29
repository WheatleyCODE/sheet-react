import { FC } from 'react';
import styles from './Logo.module.css';

export const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <h1>SHEETS</h1>
    </div>
  );
};
