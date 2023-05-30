import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from './routes/routes';
import { store } from './redux/store';
import { PathRoutes } from 'entities/share';
import './global.css';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<Navigate to={PathRoutes.CREATE_SHEETS} replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
