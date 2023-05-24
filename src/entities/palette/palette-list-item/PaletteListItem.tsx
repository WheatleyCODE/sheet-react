import { FC } from 'react';
import styles from './PaletteListItem.module.css';
import { MdCheck } from 'react-icons/md';

interface PaletteListItemProps {
  color: string;
  title: string;
}

export const PaletteListItem: FC<PaletteListItemProps> = ({ color, title }) => {
  return (
    <div title={title} style={{ background: color }} className={styles.item}>
      {/* <MdCheck /> */}
    </div>
  );
};
