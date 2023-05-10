import { FC } from 'react';
import { MdOutlineCalendarViewMonth, MdOutlineFolderOpen, MdOutlineFilterAlt } from 'react-icons/md';
import styles from './CreateSheetsFilters.module.css';
import { Button } from 'shared/ui';

export const CreateSheetsFilters: FC = () => {
  return (
    <div className={styles.filters}>
      <div className={styles.main}>
        <div className={styles.name}>Вчера</div>
        <div className={styles.filter_name}>По дате инзменения</div>
        <div className={styles.buttons}>
          <Button className={styles.button} Icon={MdOutlineCalendarViewMonth} />
          <Button className={styles.button} Icon={MdOutlineFilterAlt} />
          <Button className={styles.button} Icon={MdOutlineFolderOpen} />
        </div>
      </div>
    </div>
  );
};
