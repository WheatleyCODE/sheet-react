export const enum EventNames {
  FORMULA_ENTER = 'FORMULA_ENTER',
  FORMULA_ACTIVE = 'FORMULA_ACTIVE',
  FORMULA_BLUR = 'FORMULA_BLUR',
  OPEN_FILES = 'OPEN_FILES',
}

export type FormulaActive = {
  type: EventNames.FORMULA_ACTIVE;
};

export type FormulaBlur = {
  type: EventNames.FORMULA_BLUR;
};

export type FormulaEnter = {
  type: EventNames.FORMULA_BLUR;
};

export type OpenFiles = {
  type: EventNames.OPEN_FILES;
};

export type EmitterData = OpenFiles | FormulaActive | FormulaBlur | FormulaEnter;
