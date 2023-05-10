import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { JOURNAL_ROUTE } from '../constants/routeConstants';

export const Auth = () => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'not-authenticated') {
      return navigate(JOURNAL_ROUTE);
    }
  }, [status]);

  return <Outlet />;
};
