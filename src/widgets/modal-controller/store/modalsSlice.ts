import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IModalsState {
  renameListModal: {
    isShow: boolean;
    id: string;
  };

  deleteListModal: {
    isShow: boolean;
    id: string;
  };
}

export const initialState: IModalsState = {
  renameListModal: {
    isShow: false,
    id: '',
  },

  deleteListModal: {
    isShow: false,
    id: '',
  },
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeRenameList: (state, { payload }: PayloadAction<{ isShow: boolean; id: string }>) => {
      state.renameListModal.id = payload.id;
      state.renameListModal.isShow = payload.isShow;
    },

    changeDeleteList: (state, { payload }: PayloadAction<{ isShow: boolean; id: string }>) => {
      state.deleteListModal.id = payload.id;
      state.deleteListModal.isShow = payload.isShow;
    },
  },
});

export const modalsActions = modalsSlice.actions;
