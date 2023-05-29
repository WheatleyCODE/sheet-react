import * as tableActions from 'widgets/sheets/store/table/tableActions';
import * as sheetsActions from 'widgets/sheets/store/sheets/sheetsActions';
import * as createSheetsActions from 'widgets/create-sheets/store/createSheetsActions';

export const rootActions = {
  ...tableActions,
  ...sheetsActions,
  ...createSheetsActions,
};
