import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IChangeModal, IChangeModalId, IModalsState } from './interface';

export const initialState: IModalsState = {
  renameListModal: {
    isShow: false,
    id: '',
  },

  deleteListModal: {
    isShow: false,
    id: '',
  },

  loaderModal: {
    isShow: false,
  },
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeRenameList: (state, { payload }: PayloadAction<IChangeModalId>) => {
      state.renameListModal.id = payload.id;
      state.renameListModal.isShow = payload.isShow;
    },

    changeDeleteList: (state, { payload }: PayloadAction<IChangeModalId>) => {
      state.deleteListModal.id = payload.id;
      state.deleteListModal.isShow = payload.isShow;
    },

    changeLoader: (state, { payload }: PayloadAction<IChangeModal>) => {
      state.loaderModal.isShow = payload.isShow;
    },
  },
});

export const modalsActions = modalsSlice.actions;
