import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { fireEvent, render, screen } from '@testing-library/react';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: (email, password) => {
    return () => mockStartLoginWithEmailPassword(email, password);
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  // The state that we want to set
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('testing in LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  it('should call startGoogleSignIn when we click on google button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const googleBtn = screen.getByLabelText('google-btn');

    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  it('should call startLoginWithEmailPassword when we click on sumbit button', () => {
    const email = 'email@email.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    const passwordField = screen.getByTestId('password');
    const loginForm = screen.getByTestId('submit-form');

    fireEvent.change(emailField, { target: { name: 'email', value: email } });
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith(
      email,
      password,
    );
  });
});
