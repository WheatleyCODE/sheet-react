import { combineReducers } from 'redux';
import { asideSlice, toolbarSlice, tableSlice, createSheetsSlice } from 'widgets';

export const rootReducer = combineReducers({
  [tableSlice.name]: tableSlice.reducer,
  [toolbarSlice.name]: tableSlice.reducer,
  [asideSlice.name]: asideSlice.reducer,
  [createSheetsSlice.name]: createSheetsSlice.reducer,
});
