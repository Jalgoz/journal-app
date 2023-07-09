import '@testing-library/jest-dom/extend-expect';

// In case to use vit install the dependency npm install --save-dev setimmediate
// otherwise we have a error with that dependency, also we need to add and import in jest.setup.js
import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from '../../src/helpers/fileUpload';
import { simpleErrorAlert } from '../../src/helpers/alerts';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dd43vyozx',
  api_key: '919237252675194',
  api_secret: 'KqlPar0Tv-0cuuMBMXK85XEiK7U',
  secure: true
});

// Mock the simpleErrorAlert function
jest.mock('../../src/helpers/alerts.js', () => ({
  simpleErrorAlert: jest.fn(),
}));

describe('Testing in fileUpload', () => {
  beforeEach(() => {
    // Clear the mock implementation and call history before each test
    simpleErrorAlert.mockClear();
  });

  xit('should upload a file successfully to cloudinary', async () => {
    // Url image
    const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
    // Get the image
    const resp = await fetch(imageUrl);
    // Get the bytes of the image
    const blob = await resp.blob();
    // With the blob we create the file
    const file = new File([blob], 'image.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const publicId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.api.delete_resources(['journal/' + publicId]);
  });

  it('should call the simpleErrorAlert', async () => {
    const file = new File([], 'image.jpg');

    await fileUpload(file);

    expect(simpleErrorAlert).toHaveBeenCalled();
  });
});
