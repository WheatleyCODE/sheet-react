import { FC, memo } from 'react';
import styles from './CellAllSelector.module.css';

export interface ICellAllSelectorProps {
  selectAllCells: () => void;
}

export const CellAllSelector: FC<ICellAllSelectorProps> = memo(({ selectAllCells }) => {
  return <div onClick={selectAllCells} className={styles.selector}></div>;
});
