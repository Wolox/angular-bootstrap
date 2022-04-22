const BABEL_CORE_VERSION = '^7.17.x';
const COMPODOC_VERSION = '^1.1.x';
const STORYBOOK_VERSION = '^6.4.x';
const STORYBOOK_TESTING_VERSION = '0.0.x';
const BABEL_LOADER_VERSION = '^8.2.x';

export const dependencies = {
    "@babel/core": BABEL_CORE_VERSION,
    "@compodoc/compodoc": COMPODOC_VERSION,
    "@storybook/addon-actions": STORYBOOK_VERSION,
    "@storybook/addon-essentials": STORYBOOK_VERSION,
    "@storybook/addon-interactions": STORYBOOK_VERSION,
    "@storybook/addon-links": STORYBOOK_VERSION,
    "@storybook/angular": STORYBOOK_VERSION,
    "@storybook/builder-webpack5": STORYBOOK_VERSION,
    "@storybook/manager-webpack5": STORYBOOK_VERSION,
    "@storybook/testing-library": STORYBOOK_TESTING_VERSION,
    "babel-loader": BABEL_LOADER_VERSION,
}

export const scripts = {
    "docs:json": "compodoc -p ./tsconfig.json -e json -d .",
    "storybook": "npm run docs:json && start-storybook -p 6006",
    "build-storybook": "npm run docs:json && build-storybook"
}
