import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AiOutlineTable } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { MActionWindow } from 'shared/ui/action-window/ActionWindow';
import { ANIMATION_DURATION } from 'shared/consts/animate';
import styles from './SheetsCard.module.css';

interface SheetsCardProps {
  name: string;
  date: string;
}

export const SheetsCard: FC<SheetsCardProps> = ({ name, date }) => {
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();

  return (
    <div className={styles.card}>
      <div className={styles.sheets}>
        <div className={styles.icon}>
          <AiOutlineTable />
        </div>
        <div className={styles.name}>{name}</div>
      </div>

      <div className={styles.date}>{date}</div>

      <div onClick={toggleDropdown} className={styles.actions}>
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
              onSuccess={closeDropdown}
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
};
