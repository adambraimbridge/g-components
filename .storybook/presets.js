const path = require('path');

module.exports = [
  {
    name: '@storybook/addon-docs/preset',
    options: {
      configureJSX: true,
    },
  },
  {
    name: path.resolve(__dirname, './with-styles/presets.js'),
  },
];
