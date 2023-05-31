export const enum CellsEventNames {
  FOCUS = 'FOCUS',
  SELECT = 'SELECT',
}

export const enum CellsDataTypes {
  FOCUS_DEFAULT = 'FOCUS_DEFAULT',
  FOCUS_FORMULA_ENTER = 'FOCUS_FORMULA_ENTER',

  SELECT_DEFAULT = 'SELECT_DEFAULT',
  SELECT_FORMULA_ACTIVE = 'SELECT_FORMULA_ACTIVE',
}

export type CellsFocusDefault = {
  id: string;
  eventName: CellsEventNames.FOCUS;
  type: CellsDataTypes.FOCUS_DEFAULT;
};

export type CellsFocusFormulaEnter = {
  id: string;
  eventName: CellsEventNames.FOCUS;
  type: CellsDataTypes.FOCUS_FORMULA_ENTER;
  payload: { any: string };
};

export type CellsSelectDefault = {
  id: string;
  eventName: CellsEventNames.SELECT;
  type: CellsDataTypes.SELECT_DEFAULT;
  payload: {
    color: string;
  };
};

export type CellsSelectFormulaActive = {
  id: string;
  eventName: CellsEventNames.SELECT;
  type: CellsDataTypes.SELECT_FORMULA_ACTIVE;
  payload: {
    color: string;
  };
};

export type CellsEmitterData =
  | CellsFocusDefault
  | CellsFocusFormulaEnter
  | CellsSelectDefault
  | CellsSelectFormulaActive;
