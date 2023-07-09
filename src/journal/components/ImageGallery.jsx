import React from 'react';

import { Grid, ImageList, ImageListItem } from '@mui/material';

import { imageListStyle, imageStyle } from './styles';

export const ImageGallery = ({ images }) => (
<Grid container justifyContent="center">
  <Grid item xs={8} md={9} lg={8}>
    <ImageList sx={imageListStyle} rowHeight={400}>
      {images.map((image, index) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=275&h=400&fit=contain&auto=format`}
            srcSet={`${image}?w=275&h=400&fit=contain&auto=format&dpr=2 2x`}
            alt={index}
            loading="lazy"
            style={imageStyle}
          />
        </ImageListItem>
      ))}
    </ImageList>
  </Grid>
</Grid>
);