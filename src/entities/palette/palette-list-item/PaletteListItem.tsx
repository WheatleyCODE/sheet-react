import { FC } from 'react';
import styles from './PaletteListItem.module.css';
import { MdCheck } from 'react-icons/md';

interface PaletteListItemProps {
  color: string;
}

export const PaletteListItem: FC<PaletteListItemProps> = ({ color }) => {
  return (
    <div style={{ background: color }} className={styles.item}>
      {/* <MdCheck /> */}
    </div>
  );
};
