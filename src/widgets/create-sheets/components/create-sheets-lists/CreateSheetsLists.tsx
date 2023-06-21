import { FC } from 'react';
import { SheetsCard } from 'features';
import { MSheetsListItem, SheetsList } from 'entities/sheets';
import { ANIMATION_DURATION, useTypedSelector } from 'shared';
import { sheetsSortFns } from '../../consts/sheetsSorts';
import styles from './CreateSheetsLists.module.css';

export interface ICreateSheetsListsProps {
  deleteSheets: (id: string) => void;
}

export const CreateSheetsLists: FC<ICreateSheetsListsProps> = ({ deleteSheets }) => {
  const { sheets, currentSorter } = useTypedSelector((state) => state.createSheets);

  const sortSheets = [...sheets].sort(sheetsSortFns[currentSorter]);

  return (
    <div className={styles.lists}>
      <SheetsList>
        {sortSheets.map(({ name, id, openDate }, i) => (
          <MSheetsListItem
            initial={{ opacity: 0, translateX: -40 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: ANIMATION_DURATION, delay: i * 0.1, type: 'spring' }}
          >
            <SheetsCard
              deleteSheets={deleteSheets}
              id={id}
              key={id}
              name={name}
              date={new Date(openDate).toLocaleDateString()}
            />
          </MSheetsListItem>
        ))}
      </SheetsList>
    </div>
  );
};
