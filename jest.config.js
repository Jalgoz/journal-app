const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [], // To don't ignore anything everything is transpiler
};
