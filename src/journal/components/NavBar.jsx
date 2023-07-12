import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { startLogout } from '../../store';

import { appBarStyle, iconMenuStyle } from './styles';

export const NavBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar 
      position="fixed" 
      sx={appBarStyle(drawerWidth)}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={iconMenuStyle}>
          <MenuOutlined />
        </IconButton>

        <Grid 
          container 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Journal App
          </Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
};
