import { combineReducers } from 'redux';
import { tableSlice } from 'widgets/tableSlice';
import { toolbarSlice } from 'widgets/toolbarSlice';

export const rootReducer = combineReducers({
  [tableSlice.name]: tableSlice.reducer,
  [toolbarSlice.name]: tableSlice.reducer,
});
