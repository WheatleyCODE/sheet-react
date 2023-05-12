import { FC } from 'react';
import { SheetsHeader, SheetsToolbar, SheetsTable, SheetsFooter, SheetsAside, SheetsFormula } from 'widgets';
import { AnimatePresence } from 'framer-motion';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { ContextMenu, useContextMenu } from 'features';
import styles from './Sheets.module.css';

export const Sheets: FC = () => {
  const { isShow: isShowAside } = useTypedSelector((state) => state.aside);
  const { isShow: isShowContext } = useContextMenu();

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div onContextMenu={onContextMenu} className={styles.sheets}>
      <SheetsHeader />

      <div className={styles.row}>
        <div className={styles.main}>
          <SheetsToolbar />
          <SheetsFormula />
          <SheetsTable />
          <SheetsFooter />
        </div>

        <AnimatePresence>{isShowAside && <SheetsAside />}</AnimatePresence>
      </div>

      <AnimatePresence>{isShowContext && <ContextMenu />}</AnimatePresence>
    </div>
  );
};
