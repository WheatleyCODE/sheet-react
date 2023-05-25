import { FC, memo } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useDelayHover } from 'shared';
import styles from './CellCol.module.css';

interface ICellColProps {
  value: string;
  width: number;
}

export const CellCol: FC<ICellColProps> = memo(({ value, width }) => {
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 300, 0);

  return (
    <div
      style={{ width }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={styles.cell_col}
    >
      {value} <div className={styles.resize}></div>
      {isShow && (
        <div className={styles.actions}>
          <MdArrowDropDown />
        </div>
      )}
    </div>
  );
});
