import React from 'react';

import Close from '@mui/icons-material/Close';
import { IconButton, ImageListItem } from '@mui/material';

import { deleteAlert } from '../../helpers/alerts';

import { iconDeleteImage, imageStyle } from './styles';

export const ImageItem = ({ image, index }) => {
  const onDeleteImage = () => {
    deleteAlert().then(() => {
      console.log(`Delete ${image}`);
    });
  };

  return (
    <ImageListItem position="relative">
      <img
        src={`${image}?w=275&h=400&fit=contain&auto=format`}
        srcSet={`${image}?w=275&h=400&fit=contain&auto=format&dpr=2 2x`}
        alt={index}
        loading="lazy"
        style={imageStyle}
      />

      <IconButton 
        aria-label="delete-image" 
        sx={iconDeleteImage} 
        onClick={onDeleteImage}
      >
        <Close />
      </IconButton>
    </ImageListItem>
  );
};
