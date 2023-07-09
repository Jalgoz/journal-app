// Auth routes
export const AUTH_ROUTE = '/auth';
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`; 
export const REGISTER_ROUTE = `${AUTH_ROUTE}/register`; 

// Journal routes
export const JOURNAL_ROUTE = '/'; 

// Other routes
export const ANY_ROUTE = '/*'; 

// Path of the notes
export const PATH_NOTES = (uid) => `${uid}/journal/notes`;

// Cloudinary url and folder
export const PATH_CLOUDINARY = 'https://api.cloudinary.com/v1_1/dd43vyozx/upload';
export const FOLDER_CLOUD = 'react-journal';
