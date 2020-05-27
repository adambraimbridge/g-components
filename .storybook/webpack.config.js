/**
 * @file
 * Custom Webpack config for Storybook.
 * This isn't used for any actual bundling; we use Rollup for that.
 */

const path = require('path');
const webpackMerge = require('webpack-merge');

module.exports = ({ config }) => {
  const overrides = {
    resolve: {
      mainFields: ['browser', 'main'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: ['node_modules', 'node_modules/@financial-times'],
              },
            },
          ],
          include: path.resolve(__dirname, '../'),
        },
        {
          test: /\.txt/,
          loader: 'raw-loader',
        },
      ],
    },
  };

  return webpackMerge.smart(config, overrides);
};
