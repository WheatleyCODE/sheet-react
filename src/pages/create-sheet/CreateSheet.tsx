import { FC } from 'react';
import { Button } from 'shared/ui';
import { Logo } from 'entities/Logo/Logo';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'app/types/routes.';
import styles from './CreateSheet.module.css';

export const CreateSheet: FC = () => {
  return (
    <div className={styles.create_sheets}>
      <div className={styles.header}>
        <Logo />
      </div>
      <div className={styles.tempates}>
        <div className={styles.tempates_menu}>
          <div className={styles.tempate}>
            <Link to={PathRoutes.SHEET}>1</Link>
          </div>
          <div className={styles.tempate}></div>
          <div className={styles.tempate}></div>
          <div className={styles.tempate}></div>
          <div className={styles.tempate}></div>
          <div className={styles.tempate}></div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.sheets}>
          <Button text="Кнопка" />
        </div>
      </div>
    </div>
  );
};
