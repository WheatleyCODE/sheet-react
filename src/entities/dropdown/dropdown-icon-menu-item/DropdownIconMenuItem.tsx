import { FC } from 'react';
import { IconType } from 'react-icons';
import styles from './DropdownIconMenuItem.module.css';

interface IDropdownIconMenuItemProps {
  Icon: IconType;
}

export const DropdownIconMenuItem: FC<IDropdownIconMenuItemProps> = ({ Icon }) => {
  return (
    <div className={styles.item}>
      <Icon className={styles.icon} />
    </div>
  );
};
