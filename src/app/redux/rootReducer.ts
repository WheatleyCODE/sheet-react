import { combineReducers } from 'redux';
import { contextMenuSlice } from 'features';
import { asideSlice, toolbarSlice, tableSlice, createSheetsSlice, sheetsSlice } from 'widgets';

export const rootReducer = combineReducers({
  [tableSlice.name]: tableSlice.reducer,
  [toolbarSlice.name]: toolbarSlice.reducer,
  [asideSlice.name]: asideSlice.reducer,
  [createSheetsSlice.name]: createSheetsSlice.reducer,
  [sheetsSlice.name]: sheetsSlice.reducer,
  [contextMenuSlice.name]: contextMenuSlice.reducer,
});
