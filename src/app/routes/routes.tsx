import { PathRoutes } from 'shared/types/routes.';
import { CreateSheets, Sheets } from 'pages';

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
