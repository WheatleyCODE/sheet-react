import { CreateSheets, Sheets } from 'pages';
import { PathRoutes } from 'entities';

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
