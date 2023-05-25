import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  SheetsHeader,
  SheetsToolbar,
  SheetsTable,
  SheetsFooter,
  SheetsAside,
  SheetsFormula,
  ModalController,
} from 'widgets';
import { ContextMenu, useContextMenu } from 'features';
import { useTypedSelector } from 'shared';
import { useInitSheets } from '../../hooks/useInitSheets';
import styles from './Sheets.module.css';

export const Sheets: FC = () => {
  const { isShow: isShowAside } = useTypedSelector((state) => state.aside);
  const { isShow: isShowContext } = useContextMenu();

  useInitSheets();

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
      <ModalController />
    </div>
  );
};
