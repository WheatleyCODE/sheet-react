import { PathRoutes } from 'app/types/routes.';
import { CreateSheet } from 'pages/create-sheet';
import { Sheet } from 'pages/sheet';

export const routes = [
  {
    path: PathRoutes.CREATE_SHEET,
    Page: CreateSheet,
  },
  {
    path: PathRoutes.SHEET,
    Page: Sheet,
  },
];
