import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CheckingAuth } from './ui';
import { router } from './router/AppRouter';
import { useCheckAuth } from './hooks/useCheckAuth';

export const JournalApp = () => {
  const { status } = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return <RouterProvider router={router} />
};
