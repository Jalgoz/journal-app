import React from 'react'
import { Navigate } from 'react-router-dom'
import { ANY_ROUTE, JOURNAL_ROUTE } from '../../constants/routeConstants';
import { Journal } from '../Journal';
import { JournalPage } from '../pages/JournalPage'

export const JournalRouter = [
  {
    element: <Journal />,
    children: [
      {
        path: JOURNAL_ROUTE,
        element: <JournalPage />,
      },
      {
        path: ANY_ROUTE,
        element: <Navigate to="/"/>,
      },
    ]
  }
];
