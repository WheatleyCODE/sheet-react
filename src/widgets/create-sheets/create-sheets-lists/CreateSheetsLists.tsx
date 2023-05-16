import { FC } from 'react';
import { MSheetsCard } from 'features';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import { sheetsSortFns } from '../consts/sheetsSorts';
import styles from './CreateSheetsLists.module.css';
import { ANIMATION_DURATION } from 'shared/consts';

export interface ICreateSheetsListsProps {
  deleteSheets: (id: string) => Promise<void>;
}

export const CreateSheetsLists: FC<ICreateSheetsListsProps> = ({ deleteSheets }) => {
  const { sheets, currentSorter } = useTypedSelector((state) => state.createSheets);

  const sortSheets = [...sheets].sort(sheetsSortFns[currentSorter]);

  return (
    <div className={styles.lists}>
      <div className={styles.list}>
        <div className={styles.li}>
          {sortSheets.map(({ name, id, openDate }, i) => (
            <MSheetsCard
              initial={{ opacity: 0, translateX: -40 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: ANIMATION_DURATION, delay: i / 12, type: 'spring' }}
              deleteSheets={deleteSheets}
              id={id}
              key={id}
              name={name}
              date={new Date(openDate).toLocaleDateString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
