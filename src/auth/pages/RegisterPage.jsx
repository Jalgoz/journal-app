import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { LOGIN_ROUTE } from '../../constants/routeConstants';
import { startCreatingUserWithEmailPassword } from '../../store';

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidation = {
  email: [ 
    (value) => value?.includes('@'), 
    'The email must contain the @ symbol'
  ],
  password: [ 
    (value) => value?.length >= 6, 
    'The password must have more than 6 characters'
  ],
  displayName: [ 
    (value) => value?.length >= 1, 
    'The name is required'
  ],
}

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const { 
    displayName, 
    email, 
    password, 
    onInputChange, 
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid, 
  } = useForm(formData, formValidation);

  const isCheckingAuthenticated = useMemo(
    () => status === 'checking', [status]
  );

  const onHandleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Create an account">
      <form 
        onSubmit={onHandleSubmit} 
        className="animate__animated animate__fadeIn animate__faster"
      >
          <Grid container>
            <Grid item xs={12} mt={2}>
              <TextField
               label="Full name" 
               type="text" 
               placeholder="Jose Lozada"
               name="displayName"
               value={displayName}
               onChange={onInputChange}
               error={!!displayNameValid && formSubmitted}
               helperText={displayNameValid}
               fullWidth
               />
            </Grid>

            <Grid item xs={12} mt={2}>
              <TextField 
                label="Email" 
                type="email" 
                placeholder="correo@google.com"
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid} 
                fullWidth/>
            </Grid>

            <Grid item xs={12} mt={2}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={onInputChange} 
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
                fullWidth/>
            </Grid>

            <Grid container spacing={ 2 } mb={2} mt={1}>
              <Grid item xs={12} display={!errorMessage ? 'none' : ''}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12}>
                <Button 
                  disabled={isCheckingAuthenticated} 
                  type="submit" 
                  variant="contained" 
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="center">
              <Typography mr={2}>Do you have an account?</Typography>
              <Link component={RouterLink} color="inherit" to={LOGIN_ROUTE}>
                Log in
              </Link>
            </Grid> 
          </Grid>
        </form>
    </AuthLayout>
  );
};
