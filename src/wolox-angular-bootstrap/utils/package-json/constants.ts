export const jestPackage = { 
  "globals": {
    "ts-jest": {
      "astTransformers": {
        "before": [
          "jest-preset-angular/build/InlineFilesTransformer",
          "jest-preset-angular/build/StripStylesTransformer"
        ]
      }
    }
  },
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/test.ts"
  ]
}

export const dependencies = {
  "@angular-builders/jest": "^10.0.0",
  "@types/jest": "^25.2.3",
  "jest": "^26.0.1",
  "jest-preset-angular": "^8.2.0",
}

export const removeDependencies = [
  "@types/jasmine",
]
