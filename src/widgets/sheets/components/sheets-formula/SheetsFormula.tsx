import { FC, memo } from 'react';
import { MdFunctions } from 'react-icons/md';
import { useTypedSelector } from 'shared';
import styles from './SheetsFormula.module.css';

const MemoFunctions = memo(MdFunctions);

export const SheetsFormula: FC = () => {
  const { selectCells } = useTypedSelector((state) => state.table);

  return (
    <div className={styles.formula}>
      <div className={styles.coords}>{selectCells[0]?.id}</div>
      <div className={styles.textfild}>
        <div className={styles.icon}>
          <MemoFunctions />
        </div>
        <input value={selectCells[0]?.value} className={styles.input} type="text" />
      </div>
    </div>
  );
};
