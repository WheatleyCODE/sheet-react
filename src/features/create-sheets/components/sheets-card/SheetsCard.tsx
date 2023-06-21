import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { SheetsReqServiceFactory } from 'widgets';
import { MSheetsListItem } from 'entities/sheets';
import { useDropdown, MActionWindow, ANIMATION_DURATION } from 'shared';
import styles from './SheetsCard.module.css';

interface SheetsCardProps {
  id: string;
  name: string;
  date: string;
  deleteSheets: (id: string) => void;
}

export const SheetsCard: FC<SheetsCardProps> = ({ name, date, id, deleteSheets }) => {
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();
  const navigate = useNavigate();

  const openSheets = async () => {
    const sheetsReqService = SheetsReqServiceFactory();
    sheetsReqService.changeOpenDate(id);
    navigate(`sheets/${id}`);
  };

  const deleteSheetsHandler = () => {
    deleteSheets(id);
  };

  const toggleDropdownHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDropdown();
  };

  return (
    <MSheetsListItem
      initial={{ opacity: 0, translateX: -40 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: ANIMATION_DURATION }}
      onClick={openSheets}
    >
      <div className={styles.card}>
        <div className={styles.name}>{name}</div>
        <div className={styles.date}>{date}</div>

        <div onClick={toggleDropdownHandler} className={styles.actions}>
          <MdDeleteOutline />

          <AnimatePresence>
            {isShow && (
              <MActionWindow
                transition={{ duration: ANIMATION_DURATION }}
                exit={{ height: 0, width: 0, opacity: 0 }}
                animate={{ height: 'auto', width: 'auto', opacity: 1 }}
                initial={{ height: 0, width: 0, opacity: 0 }}
                actionName="Удаление"
                className={styles.action}
                onClose={closeDropdown}
                onSuccess={deleteSheetsHandler}
              >
                <div className={styles.alert}>
                  Вы действительно хотите удалить таблицу
                  <div className={styles.alert_name}>{name}?</div>
                </div>
              </MActionWindow>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MSheetsListItem>
  );
};
