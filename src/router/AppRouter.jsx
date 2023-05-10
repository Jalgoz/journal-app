import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Auth } from '../auth/Auth';
import { Journal } from '../journal/Journal';
import { LoginPage, RegisterPage } from '../auth/pages';
import { JournalPage } from '../journal/pages/JournalPage';
import { ANY_ROUTE, AUTH_ROUTE, JOURNAL_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../constants/routeConstants';

export const appRouterConfig = [
  {
    element: <Journal />,
    children: [
      {
        path: JOURNAL_ROUTE,
        element: <JournalPage />,
      },
      {
        path: ANY_ROUTE,
        element: <Navigate to={JOURNAL_ROUTE}/>,
      },
    ]
  },
  {
    path: AUTH_ROUTE,
    element: <Auth />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <LoginPage />,
      },
      {
        path: REGISTER_ROUTE,
        element: <RegisterPage />,
      },
      {
        path: AUTH_ROUTE + ANY_ROUTE,
        element: <Navigate to={LOGIN_ROUTE}/>,
      },
    ]
  }
]
export const router = createBrowserRouter(appRouterConfig);


