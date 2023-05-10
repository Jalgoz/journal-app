import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { REGISTER_ROUTE } from "../../constants/routeConstants";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password));
  }

  const onHandleGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }; 

  return (
    <AuthLayout title="Login">
      <form onSubmit={onHandleSubmit} className="animate__animated animate__fadeIn">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com" 
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticated} type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticated} variant="contained" fullWidth onClick={onHandleGoogleSignIn}>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to={REGISTER_ROUTE}>
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  );
};