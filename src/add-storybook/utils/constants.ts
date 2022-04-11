export const dependencies = {
    "@babel/core": "^7.17.9",
    "@compodoc/compodoc": "^1.1.19",
    "@storybook/addon-actions": "^6.4.20",
    "@storybook/addon-essentials": "^6.4.20",
    "@storybook/addon-interactions": "^6.4.20",
    "@storybook/addon-links": "^6.4.20",
    "@storybook/angular": "^6.4.20",
    "@storybook/builder-webpack5": "^6.4.20",
    "@storybook/manager-webpack5": "^6.4.20",
    "@storybook/testing-library": "0.0.9",
    "babel-loader": "^8.2.4",
}

export const scripts = {
    "docs:json": "compodoc -p ./tsconfig.json -e json -d .",
    "storybook": "npm run docs:json && start-storybook -p 6006",
    "build-storybook": "npm run docs:json && build-storybook"
}
