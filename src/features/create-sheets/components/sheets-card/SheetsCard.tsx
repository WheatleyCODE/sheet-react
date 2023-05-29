import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AiOutlineTable } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { sheetsController } from 'widgets';
import { useDropdown, MActionWindow, ANIMATION_DURATION } from 'shared';
import styles from './SheetsCard.module.css';

interface SheetsCardProps {
  id: string;
  name: string;
  date: string;
  deleteSheets: (id: string) => void;
}

export const SheetsCard = forwardRef<HTMLDivElement, SheetsCardProps>(({ name, date, id, deleteSheets }, ref) => {
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();
  const navigate = useNavigate();

  const openSheets = async () => {
    await sheetsController.changeOpenDate(id);
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
    <div ref={ref} aria-hidden onClick={openSheets} className={styles.card}>
      <div className={styles.sheets}>
        <div className={styles.icon}>
          <AiOutlineTable />
        </div>
        <div className={styles.name}>{name}</div>
      </div>

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
  );
});

export const MSheetsCard = motion(SheetsCard);
