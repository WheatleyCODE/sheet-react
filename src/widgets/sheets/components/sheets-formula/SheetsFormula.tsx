import { FC } from 'react';
import { MdFunctions } from 'react-icons/md';
import { useTypedSelector } from 'shared';
import styles from './SheetsFormula.module.css';

export const SheetsFormula: FC = () => {
  const { selectCells } = useTypedSelector((state) => state.table);

  return (
    <div className={styles.formula}>
      <div className={styles.coords}>{selectCells[0]?.id}</div>
      <div className={styles.textfild}>
        <div className={styles.icon}>
          <MdFunctions />
        </div>
        <input className={styles.input} type="text" />
      </div>
    </div>
  );
};
