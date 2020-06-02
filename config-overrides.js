module.exports = {
  
  jest: function (config) {
    config.browser = true;
    // config.clearMocks = true;
    config.moduleFileExtensions.push('mdx');
    config.transform = {
      '\\.txt$': 'jest-raw-loader',
      '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
       ...config.transform
    }

    return config
  }
}