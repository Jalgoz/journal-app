import React from 'react';
import { Navigate } from 'react-router-dom';
import { ANY_ROUTE, AUTH_LOGIN_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../../constants/routeConstants';
import { Auth } from '../Auth';
import { LoginPage, RegisterPage } from '../pages';

export const AuthRouter = [
  {
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
        path: ANY_ROUTE,
        element: <Navigate to={AUTH_LOGIN_ROUTE}/>,
      },
    ]
  }
];