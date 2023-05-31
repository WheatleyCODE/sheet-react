import {
  CellsDataTypes,
  CellsEventNames,
  CellsFocusDefault,
  CellsFocusFormulaEnter,
  CellsSelectDefault,
  CellsSelectFormulaActive,
} from './interface';

export const cellsFocusDefault = (
  id: string,
  eventName: CellsEventNames.FOCUS,
  type: CellsDataTypes.FOCUS_DEFAULT
): CellsFocusDefault => ({
  type,
  id,
  eventName,
});

export const cellsFocusFormulaEnter = (
  id: string,
  eventName: CellsEventNames.FOCUS,
  type: CellsDataTypes.FOCUS_FORMULA_ENTER,
  payload: { any: string }
): CellsFocusFormulaEnter => ({
  type,
  id,
  eventName,
  payload,
});

export const cellsSelectDefault = (
  id: string,
  eventName: CellsEventNames.SELECT,
  type: CellsDataTypes.SELECT_DEFAULT,
  payload: { color: string }
): CellsSelectDefault => ({
  id,
  type,
  eventName,
  payload,
});

export const cellsSelectFormulaActive = (
  id: string,
  eventName: CellsEventNames.SELECT,
  type: CellsDataTypes.SELECT_FORMULA_ACTIVE,
  payload: { color: string }
): CellsSelectFormulaActive => ({
  id,
  type,
  eventName,
  payload,
});
