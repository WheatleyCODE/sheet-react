import { PathRoutes } from 'app/types/routes.';
import { CreateSheets } from 'pages/create-sheets';
import { Sheets } from 'pages/sheets';

export const routes = [
  {
    path: PathRoutes.CREATE_SHEETS,
    Page: CreateSheets,
  },
  {
    path: PathRoutes.SHEETS,
    Page: Sheets,
  },
];
