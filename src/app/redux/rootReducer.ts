import { combineReducers } from 'redux';
import { asideSlice, toolbarSlice, tableSlice, createSheetsSlice, sheetsSlice } from 'widgets';

export const rootReducer = combineReducers({
  [tableSlice.name]: tableSlice.reducer,
  [toolbarSlice.name]: tableSlice.reducer,
  [asideSlice.name]: asideSlice.reducer,
  [createSheetsSlice.name]: createSheetsSlice.reducer,
  [sheetsSlice.name]: sheetsSlice.reducer,
});
