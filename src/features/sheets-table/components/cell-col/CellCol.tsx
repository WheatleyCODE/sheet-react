import { FC, memo } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useDelayHover } from 'shared';
import styles from './CellCol.module.css';

interface ICellColProps {
  value: string;
  width: number;
  id: number;
}

export const CellCol: FC<ICellColProps> = memo(({ value, width, id }) => {
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 300, 0);

  return (
    <div
      style={{ width }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={styles.cell_col}
    >
      {value}

      <div data-col-resize={id} className={styles.resize}>
        <div data-line className={styles.line} />
      </div>

      {isShow && (
        <div className={styles.actions}>
          <MdArrowDropDown />
        </div>
      )}
    </div>
  );
});
