import { v2 as cloudinary } from 'cloudinary/lib/cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_API_KEY,
  api_secret: process.env.REACT_APP_API_SECRET,
  secure: process.env.REACT_APP_SECURE,
});

export default cloudinary;
