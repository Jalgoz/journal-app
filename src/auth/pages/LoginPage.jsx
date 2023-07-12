import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Google from '@mui/icons-material/Google';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { REGISTER_ROUTE } from '../../constants/routeConstants';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';

const formData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password));
  };

  const onHandleGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        data-testid="submit-form"
        onSubmit={onHandleSubmit} 
        className="animate__animated animate__fadeIn"
      >
          <Grid container>
            <Grid item xs={12} mt={2}>
              <TextField 
                label="Email" 
                type="email" 
                placeholder="email@google.com" 
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
                inputProps={{ // With this props we can do testing
                  'data-testid': 'password'
                }}
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid container spacing={ 2 } mb={2} mt={1}>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthenticated} 
                  type="submit" 
                  variant="contained" 
                  fullWidth
                >
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthenticated} 
                  variant="contained" 
                  fullWidth
                  aria-label="google-btn"
                  onClick={onHandleGoogleSignIn}
                >
                  <Google />
                  <Typography ml={1}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to={REGISTER_ROUTE}>
                Create an account
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  );
};
