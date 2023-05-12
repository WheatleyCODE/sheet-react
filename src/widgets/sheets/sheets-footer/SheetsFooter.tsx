import { FC, Fragment } from 'react';
import { ListActions, ListsControllers, ToggleAside } from 'features';
import styles from './SheetsFooter.module.css';
import { useTypedSelector } from 'shared/lib/hooks/redux/useTypedSelector';

export const SheetsFooter: FC = () => {
  const { lists } = useTypedSelector((state) => state.sheets);

  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <ListsControllers lists={lists} />

        <div className={styles.margin5} />

        {lists.map(({ name }, i) => (
          <Fragment key={i}>
            <ListActions name={name} isActive />
            <div className={styles.margin5} />
          </Fragment>
        ))}
      </div>

      <div className={styles.right}>
        <ToggleAside />
      </div>
    </div>
  );
};
