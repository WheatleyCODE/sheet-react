import { FC, ReactNode } from 'react';
import styles from './PaletteList.module.css';

interface PaletteListProps {
  children: ReactNode;
}

export const PaletteList: FC<PaletteListProps> = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};
