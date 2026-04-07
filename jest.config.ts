import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '@tokens/(.*)': '<rootDir>/src/tokens/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
  },
};

export default config;
