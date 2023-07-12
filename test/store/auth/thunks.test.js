import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase');

describe('Testing in auth Thunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('should invoke the checkingAuthentication', async () => {
    // checkingAuthentication();
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  it('should invoke startGoogleSignIn with result OK', async () => {
    const loginData = { ok: true, ...demoUser };
    // We can mock this function because we used jest.mock('..firebase')
    // so all that comes from there can be mock
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('should invoke startGoogleSignIn with result ERROR', async () => {
    const loginData = { ok: false, errorMessage: 'Error' };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  it('should invoke startCreatingUserWithEmailPassword with result OK', 
  async () => {
    const user = {
      email: demoUser.email,
      displayName: demoUser.displayName,
      password: '12345678',
    };
    const returnData = { ok: true, ...demoUser };

    await registerUserWithEmailPassword.mockResolvedValue(returnData);
    await startCreatingUserWithEmailPassword(user)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(login(returnData));
  });

  it('should invoke startCreatingUserWithEmailPassword with result ERROR', 
  async () => {
    const user = {
      email: demoUser.email,
      displayName: demoUser.displayName,
      password: '12345678',
    };
    const returnData = { ok: false, errorMessage: 'Error' };

    await registerUserWithEmailPassword.mockResolvedValue(returnData);
    await startCreatingUserWithEmailPassword(user)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(logout(returnData));
  });

  it('should invoke startLoginWithEmailPassword with result OK', 
  async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '12345678' };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('should invoke startLoginWithEmailPassword with result ERROR', 
  async () => {
    const loginData = { ok: false, errorMessage: 'Error' };
    const formData = { email: demoUser.email, password: '12345678' };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  it('should invoke startLogout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
  });
});
