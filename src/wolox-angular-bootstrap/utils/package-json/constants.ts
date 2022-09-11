export const jestPackage = {
  globals: {
    'ts-jest': {
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
    },
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/test.ts',
  ],
};

export const dependencies = {
  '@angular-builders/jest': '^14.0.1',
  '@types/jest': '^28.1.7',
  jest: '^28.1.3',
  'jest-preset-angular': '^12.2.2',
};

export const devDependencies = {
  '@angular-eslint/schematics': '^14.0.4',
  '@wolox/eslint-config-typescript': '^3.0.0',
};

export const removeDependencies = [
  '@types/jasmine',
  'karma',
  'karma-chrome-launcher',
  'karma-jasmine',
  'karma-jasmine-html-reporter',
  'jasmine-core', 
  'karma-coverage',
];
