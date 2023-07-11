import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@mui/material';

import { formStyle, gridAuthLayoutStyle } from './styles';

export const AuthLayout = ({ children, title = '' }) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={gridAuthLayoutStyle}
  >
    <Grid
      item
      className="box-shadow"
      xs={3}
      sx={formStyle}
    >
      <Typography
        variant="h5"
        mb={1}
      >
        {title}
      </Typography>
      {children}
    </Grid>
  </Grid>
);

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
};
