import { FC } from 'react';
import {
  CellsBorder,
  CellsColors,
  CellsTextFormats,
  CellsTypes,
  CellsView,
  ChangeLastActions,
  CellsFontFamily,
  CellsFormats,
  CellsFunctions,
  CellsFontSize,
} from 'features';
import styles from './SheetsToolbar.module.css';

export const SheetsToolbar: FC = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.main}>
        <ChangeLastActions />
        <div className={styles.space} />
        <CellsView />
        <div className={styles.space} />
        <CellsTypes />
        <div className={styles.space} />
        <CellsFontFamily />
        <div className={styles.space} />
        <CellsFontSize />
        <div className={styles.space} />
        <CellsTextFormats />
        <div className={styles.space} />
        <CellsColors />
        <div className={styles.space} />
        <CellsBorder />
        <div className={styles.space} />
        <CellsFormats />
        <div className={styles.space} />
        <CellsFunctions />
      </div>
    </div>
  );
};
