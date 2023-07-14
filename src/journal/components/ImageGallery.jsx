import React from 'react';

import { Grid, ImageList } from '@mui/material';

import { imageListStyle } from './styles';
import { ImageItem } from './ImageItem';

export const ImageGallery = ({ images }) => (
<Grid container justifyContent="center">
  <Grid item xs={8} md={9} lg={8}>
    <ImageList sx={imageListStyle} rowHeight={400}>
      {images.map((image, index) => (
        <ImageItem 
          key={image} 
          image={image} 
          index={index} 
        />
      ))}
    </ImageList>
  </Grid>
</Grid>
);