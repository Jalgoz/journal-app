import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authFixtures';
import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';

describe('Testing in authSlice', () => {
  it('should return the initial state and called "auth"', () => {
    const state = authSlice.reducer(initialState, {});

    expect(authSlice.name).toBe('auth');
    expect(state).toEqual(initialState);
  });

  it('should do the authentication', () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      uid: '123ABC',
      email: 'demo@google.com',
      displayName: 'Demo user',
      photoURL: 'https://demo.jpg',
      errorMessage: null,
    });
  });

  it('should do the logout without message error', () => {
    const errorMessage = undefined;
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  it('should do the logout with message error', () => {
    const errorMessage = 'Wrong credential';
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  it('should change the state to checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe('checking');
  });
});
