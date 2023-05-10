import React, { useMemo, useState } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/routeConstants';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store';

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidation = {
  email: [ (value) => value?.includes('@'), 'El correo debe de tener un @'],
  password: [ (value) => value?.length >= 6, 'El password debe de tener más de 6 letras'],
  displayName: [ (value) => value?.length >= 1, 'El nombre es obligatorio'],
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

  const isCheckingAuthenticated = useMemo(() => status === 'checking', [status]);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onHandleSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
               label="Nombre completo" 
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

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid} 
                fullWidth/>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
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

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} display={!errorMessage ? 'none' : ''}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button disabled={isCheckingAuthenticated} type="submit" variant="contained" fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to={LOGIN_ROUTE}>
                ingresar
              </Link>
            </Grid> 
          </Grid>
        </form>
    </AuthLayout>
  );
};