import { FC } from 'react';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'app/types/routes.';

export const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <Link className={styles.link} to={PathRoutes.CREATE_SHEETS}>
        <h1>SHEETS</h1>
      </Link>
    </div>
  );
};
