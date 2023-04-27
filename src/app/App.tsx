import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './store';
import './global.css';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
