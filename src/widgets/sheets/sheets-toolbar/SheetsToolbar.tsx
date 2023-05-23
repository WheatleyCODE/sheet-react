import { FC } from 'react';
import {
  CellsBorder,
  CellsColor,
  CellsTextFormats,
  CellsTypes,
  CellsView,
  ChangeLastActions,
  CellsFontFamily,
  CellsHorAlign,
  CellsVerAlign,
  CellsFunctions,
  CellsFontSize,
  CellsTextColor,
  CellsTextWrap,
  CellsFilters,
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
        <CellsTextColor />
        <CellsColor />
        <div className={styles.space} />
        <CellsBorder />
        <div className={styles.space} />
        <CellsHorAlign />
        <CellsVerAlign />
        <CellsTextWrap />
        <div className={styles.space} />
        <CellsFilters />
        <CellsFunctions />
      </div>
    </div>
  );
};
