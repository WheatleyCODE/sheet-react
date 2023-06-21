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
import { useTypedSelector } from 'shared/lib';

export const SheetsToolbar: FC = () => {
  const { selectCells } = useTypedSelector((state) => state.table);

  const cell = selectCells[0] || {};

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
        <CellsHorAlign align={cell.horizontalAlign} changeAlign={() => {}} />
        <CellsVerAlign align={cell.verticalAlign} changeAlign={() => {}} />
        <CellsTextWrap wrap={cell.textWrap} changeWrap={() => {}} />
        <div className={styles.space} />
        <CellsFilters />
        <CellsFunctions />
      </div>
    </div>
  );
};
