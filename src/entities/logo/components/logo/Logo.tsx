import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PathRoutes } from 'entities';
import styles from './Logo.module.css';

export const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <Link className={styles.link} to={PathRoutes.CREATE_SHEETS}>
        <h1>SHEETS</h1>
      </Link>
    </div>
  );
};
