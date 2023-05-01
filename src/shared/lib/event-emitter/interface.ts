export const enum EventNames {
  TOOLBAR_FOCUS = 'TOOLBAR_FOCUS',
  OPEN_FILES = 'OPEN_FILES',
}

export type ToolbarFocus = {
  type: EventNames.TOOLBAR_FOCUS;
};

export type OpenFiles = {
  type: EventNames.OPEN_FILES;
};

export type EmitterData = OpenFiles | ToolbarFocus;
