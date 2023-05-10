import { FC } from 'react';
import { AiOutlineTable } from 'react-icons/ai';
import { MdMoreVert } from 'react-icons/md';
import styles from './SheetsCard.module.css';

interface SheetsCardProps {
  name: string;
  date: string;
}

export const SheetsCard: FC<SheetsCardProps> = ({ name, date }) => {
  return (
    <div className={styles.card}>
      <div className={styles.sheets}>
        <div className={styles.icon}>
          <AiOutlineTable />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.date}>{date}</div>
      <div className={styles.actions}>
        <MdMoreVert />
      </div>
    </div>
  );
};
