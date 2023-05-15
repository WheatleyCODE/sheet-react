import { FC } from 'react';
import styles from './CreateSheetsLists.module.css';
import { SheetsCard } from 'entities/index';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';

export interface ICreateSheetsListsProps {
  deleteSheets: (id: string) => Promise<void>;
}

export const CreateSheetsLists: FC<ICreateSheetsListsProps> = ({ deleteSheets }) => {
  const { sheets } = useTypedSelector((state) => state.createSheets);

  return (
    <div className={styles.lists}>
      <div className={styles.list}>
        <div className={styles.li}>
          {sheets.map(({ name, id }) => (
            <SheetsCard deleteSheets={deleteSheets} id={id} key={id} name={name} date="26.06.2023" />
          ))}
        </div>
      </div>
    </div>
  );
};
