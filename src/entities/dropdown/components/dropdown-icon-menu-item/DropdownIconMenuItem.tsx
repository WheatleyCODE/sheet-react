import { FC } from 'react';
import { IconType } from 'react-icons';
import styles from './DropdownIconMenuItem.module.css';

interface IDropdownIconMenuItemProps {
  Icon: IconType;
  isActive?: boolean;
}

export const DropdownIconMenuItem: FC<IDropdownIconMenuItemProps> = ({ Icon, isActive }) => {
  return (
    <div className={`${styles.item} ${isActive && styles.active}`}>
      <Icon className={styles.icon} />
    </div>
  );
};
