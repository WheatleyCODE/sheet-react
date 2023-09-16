import { FC, memo } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useDelayHover } from 'shared';
import styles from './CellCol.module.css';

interface ICellColProps {
  value: string;
  width: number;
  id: number;
  isSelect?: boolean;
  selectAllCol: (id: number) => void;
}

export const CellCol: FC<ICellColProps> = memo(({ value, width, id, selectAllCol, isSelect }) => {
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 300, 0);

  const onClick = () => {
    selectAllCol(id);
  };

  return (
    <div
      style={{ width }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={`${styles.cell_col} ${isSelect && styles.select}`}
      onClick={onClick}
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
