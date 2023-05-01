import { FC, useRef } from 'react';
import styles from './Cell.module.css';

export interface ICellProps {
  isActive?: boolean;
}

export const Cell: FC<ICellProps> = ({ isActive }) => {
  const input = useRef<HTMLDivElement | null>(null);

  const onClick = () => {
    input.current?.click();
  };

  return (
    <div onClick={onClick} className={`${styles.cell} ${isActive && styles.active}`}>
      <div ref={input} className={styles.cell_input} contentEditable></div>
      {isActive && <div className={styles.cell_select} />}
    </div>
  );
};
