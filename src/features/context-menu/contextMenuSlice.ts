import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Coords {
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
}

export interface IContextMenuState {
  isShow: boolean;
  coords: Coords;
}

export const initialState: IContextMenuState = {
  isShow: false,
  coords: {},
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    changeIsShow: (state, { payload }: PayloadAction<boolean>) => {
      state.isShow = payload;
    },

    changeCoords: (state, { payload }: PayloadAction<Coords>) => {
      state.coords = payload;
    },

    toggleIsShow: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const contextMenuActions = contextMenuSlice.actions;
