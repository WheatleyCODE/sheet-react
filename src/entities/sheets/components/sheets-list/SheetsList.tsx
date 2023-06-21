import { FC, ReactNode } from 'react';
import styles from './SheetsList.module.css';

interface ISheetsListProps {
  children: ReactNode;
}

export const SheetsList: FC<ISheetsListProps> = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};
