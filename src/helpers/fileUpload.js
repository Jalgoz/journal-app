import { FOLDER_CLOUD, PATH_CLOUDINARY } from '../constants/routeConstants';
import { simpleErrorAlert } from './alerts';

const UPLOAD_PRESET = 'upload_preset';
const FILE = 'file';

export const fileUpload = async (file) => {
  if (!file) {
    simpleErrorAlert('Error', 'No files select');
  }

  const cloudUrl = PATH_CLOUDINARY;
  const formData = new FormData();
  formData.append(UPLOAD_PRESET, FOLDER_CLOUD);
  formData.append(FILE, file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) {
      simpleErrorAlert('Error', 'Error uploading the files');
    }
    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    simpleErrorAlert('Error', error);
  }
};
