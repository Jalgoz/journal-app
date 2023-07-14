// Navbar
export const appBarStyle = (drawerWidth) => ({
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
});

export const iconMenuStyle = { mr: 2, display: { sm: 'none' } };

// Sidebar
export const boxNavStyle = (drawerWidth) => ({ 
  width: { sm: drawerWidth }, 
  flexShrink: { sm: 0 } 
});

export const drawerStyle = (drawerWidth) => ({ 
  display: { xs: 'block' },
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, 
});

// ImageGalleryStyles
export const imageListStyle = {
  width: '100%',
  height: 'auto',
  gridTemplateColumns: {
    xs: 'repeat(1, 1fr) !important',
    md: 'repeat(2, 1fr) !important',
    lg: 'repeat(3, 1fr) !important',
  },
};

// ImageItem
export const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
};

export const iconDeleteImage = {
  position: 'absolute', 
  right: 2, 
  top: 2, 
  cursor: 'pointer',
  transition: '.3s',
  '&:hover': {
    color: '#555'
  }
};
