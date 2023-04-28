import { FC } from 'react';
import { SheetHeader, SheetToolbar, SheetTable, SheetFooter, SheetAside } from 'widgets';
import styles from './Sheet.module.css';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { AnimatePresence } from 'framer-motion';

export const Sheet: FC = () => {
  const { isShow } = useTypedSelector((state) => state.aside);

  return (
    <div className={styles.sheet}>
      <SheetHeader />

      <div className={styles.row}>
        <div className={styles.main}>
          <SheetToolbar />
          <SheetTable />
          <SheetFooter />
        </div>

        <AnimatePresence>{isShow && <SheetAside />}</AnimatePresence>
      </div>
    </div>
  );
};
