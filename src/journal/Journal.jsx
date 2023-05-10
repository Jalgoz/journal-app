import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '../constants/routeConstants';

export const Journal = () => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'authenticated') {
      return navigate(LOGIN_ROUTE);
    }
  }, [status]);

  return <Outlet />;
};
