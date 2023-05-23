import { FC, ReactNode } from 'react';
import styles from './DropdownIconMenu.module.css';

interface IDropdownIconMenuProps {
  children: ReactNode;
}

export const DropdownIconMenu: FC<IDropdownIconMenuProps> = ({ children }) => {
  return <div className={styles.menu}>{children}</div>;
};
