import { FC } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useDelayHover } from 'shared/lib/hooks/useDelayHover';
import styles from './CellCol.module.css';

export const CellCol: FC = () => {
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 300, 0);

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove} className={styles.cell_col}>
      A <div className={styles.resize}></div>
      {isShow && (
        <div className={styles.actions}>
          <MdArrowDropDown />
        </div>
      )}
    </div>
  );
};
