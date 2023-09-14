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
import { useTypedDispatch, useTypedSelector } from 'shared/lib';
import { HorizontalAligns, TextWraps, VerticalAligns } from 'entities/share';
import styles from './SheetsToolbar.module.css';

export const SheetsToolbar: FC = () => {
  const { selectCells } = useTypedSelector((state) => state.table);
  const dispatch = useTypedDispatch();
  const cell = selectCells[0] || {};

  const changeHorAlign = (align: HorizontalAligns) => {};
  const changeVerAlign = (align: VerticalAligns) => {};
  const changeTextWrap = (wrap: TextWraps) => {};

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

        <CellsHorAlign align={cell.horizontalAlign} changeAlign={changeHorAlign} />
        <CellsVerAlign align={cell.verticalAlign} changeAlign={changeVerAlign} />
        <CellsTextWrap wrap={cell.textWrap} changeWrap={changeTextWrap} />
        <div className={styles.space} />

        <CellsFilters />
        <CellsFunctions />
      </div>
    </div>
  );
};
