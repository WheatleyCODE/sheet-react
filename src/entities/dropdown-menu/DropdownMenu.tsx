import { FC, ReactNode } from 'react';
import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  children: ReactNode;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ children }) => {
  return <div className={styles.menu}>{children}</div>;
};
