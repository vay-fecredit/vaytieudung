module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': 'babel-jest',
  },
  moduleNameMapper: {
    '^jquery$': '<rootDir>/tests/jquery-shim.js',
    '^emailjs-com$': '<rootDir>/tests/emailjs-shim.js',
    '^./scripts.js$': '<rootDir>/tests/scripts.js',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
};
