import { FC } from 'react';
import { SheetsHeader, SheetsToolbar, SheetsTable, SheetsFooter, SheetsAside, SheetsFormula } from 'widgets';
import { AnimatePresence } from 'framer-motion';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import styles from './Sheets.module.css';

export const Sheets: FC = () => {
  const { isShow } = useTypedSelector((state) => state.aside);

  return (
    <div className={styles.sheets}>
      <SheetsHeader />

      <div className={styles.row}>
        <div className={styles.main}>
          <SheetsToolbar />
          <SheetsFormula />
          <SheetsTable />
          <SheetsFooter />
        </div>

        <AnimatePresence>{isShow && <SheetsAside />}</AnimatePresence>
      </div>
    </div>
  );
};
