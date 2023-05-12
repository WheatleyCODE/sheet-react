import { FC, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {
  SheetsHeader,
  SheetsToolbar,
  SheetsTable,
  SheetsFooter,
  SheetsAside,
  SheetsFormula,
  tableActions,
  sheetsActions,
} from 'widgets';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { ContextMenu, useContextMenu } from 'features';
import { createTable } from 'widgets/sheets/helpers/createTable';
import { useTypedDispatch } from 'shared/lib/hooks/redux/useTypedDispatch';
import { KVFactory, LocalStorageEngine } from 'shared/lib/kv-storage';
import { generateId } from 'shared/lib/ids';
import styles from './Sheets.module.css';

export const Sheets: FC = () => {
  const { isShow: isShowAside } = useTypedSelector((state) => state.aside);
  const { isShow: isShowContext } = useContextMenu();
  const { id } = useParams();
  const dispatch = useTypedDispatch();

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const check = async () => {
      if (!id) return;

      const ls = KVFactory('sheets', new LocalStorageEngine());
      const sheets = await ls.get(id);
      console.log(sheets);

      const { cols, rows, cells } = createTable(30, 30);
      const newId = generateId();
      const newId2 = 'randomId'; // ! fix

      dispatch(
        sheetsActions.initSheets({ name: 'Таблица', lists: [{ name: 'Лист 1', id: newId }], settings: {}, id: newId2 })
      );
      dispatch(tableActions.initTable({ cols, rows, cells, id: newId }));
    };

    check();
  }, []);

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
