import { FC } from 'react';
import { SheetHeader, SheetToolbar, SheetTable, SheetFooter, SheetAside, SheetFormula } from 'widgets';
import { AnimatePresence } from 'framer-motion';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import styles from './Sheet.module.css';

export const Sheet: FC = () => {
  const { isShow } = useTypedSelector((state) => state.aside);

  return (
    <div className={styles.sheet}>
      <SheetHeader />

      <div className={styles.row}>
        <div className={styles.main}>
          <SheetToolbar />
          <SheetFormula />
          <SheetTable />
          <SheetFooter />
        </div>

        <AnimatePresence>{isShow && <SheetAside />}</AnimatePresence>
      </div>
    </div>
  );
};
