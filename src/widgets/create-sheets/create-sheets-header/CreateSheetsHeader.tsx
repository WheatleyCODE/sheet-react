import { FC } from 'react';
import { Logo } from 'entities';
import styles from './CreateSheetsHeader.module.css';

export const CreateSheetsHeader: FC = () => {
  return (
    <div className={styles.header}>
      <Logo />
    </div>
  );
};
