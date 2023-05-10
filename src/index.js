import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import reportWebVitals from './reportWebVitals';
import { JournalApp } from './JournalApp';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <AppTheme>
        <JournalApp />
      </AppTheme>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
