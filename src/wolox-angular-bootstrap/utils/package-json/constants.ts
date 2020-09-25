export const jestPackage = { 
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/test.ts"
  ]
}


export const dependencies = [
  "@angular-builders/jest",
  "@types/jest",
  "jest",
  "jest-preset-angular",
]


export const removeDependencies = [
  "@types/jasmine",
  "karma",
  "karma-chrome-launcher",
  "karma-coverage-istanbul-reporter",
  "karma-jasmine",
  "karma-jasmine-html-reporter"
]
