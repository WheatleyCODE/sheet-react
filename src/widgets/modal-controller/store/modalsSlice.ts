import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IModalsState {
  renameList: {
    isShow: boolean;
    id: string;
  };

  deleteList: {
    isShow: boolean;
    id: string;
  };
}

export const initialState: IModalsState = {
  renameList: {
    isShow: false,
    id: '',
  },

  deleteList: {
    isShow: false,
    id: '',
  },
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeRenameList: (state, { payload }: PayloadAction<{ isShow: boolean; id: string }>) => {
      state.renameList.id = payload.id;
      state.renameList.isShow = payload.isShow;
    },

    changeDeleteList: (state, { payload }: PayloadAction<{ isShow: boolean; id: string }>) => {
      state.deleteList.id = payload.id;
      state.deleteList.isShow = payload.isShow;
    },
  },
});

export const modalsActions = modalsSlice.actions;
