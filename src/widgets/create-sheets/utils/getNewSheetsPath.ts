import { v4 } from 'uuid';

export const getNewSheetsPath = () => {
  return `sheets/${v4()}`;
};
