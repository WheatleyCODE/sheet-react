import { FC } from 'react';
import { SheetsCard } from 'features';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';
import styles from './CreateSheetsLists.module.css';

export interface ICreateSheetsListsProps {
  deleteSheets: (id: string) => Promise<void>;
}

export const CreateSheetsLists: FC<ICreateSheetsListsProps> = ({ deleteSheets }) => {
  const { sheets } = useTypedSelector((state) => state.createSheets);

  return (
    <div className={styles.lists}>
      <div className={styles.list}>
        <div className={styles.li}>
          {sheets.map(({ name, id, openDate }) => (
            <SheetsCard
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
