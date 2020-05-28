/**
 * @file
 * Custom Webpack config for Storybook.
 * This isn't used for any actual bundling; we use Rollup for that.
 */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = (mode = 'production') => ({
  mode,
  output: {
    libraryTarget: 'umd',
    path: __dirname,
    filename: 'dist/gcomponents.js',
    library: 'GComponents',
    umdNamedDefine: true,
    sourceMapFilename: 'dist/gcomponents.map',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  entry: ['./index.js'],
  resolve: {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    mainFields: ['browser', 'main'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      assets: path.resolve(__dirname, 'assets'),
    },
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
          ],
          plugins: [
            // 'add-module-exports' /* <-- wtfits */,
            '@babel/transform-runtime',
            '@babel/plugin-proposal-class-properties',
            '@babel/syntax-dynamic-import',
          ],
          env: {
            production: {
              presets: ['@emotion/babel-preset-css-prop'],
            },
            test: {
              plugins: ['require-context-hook'],
            },
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: ['node_modules', 'node_modules/@financial-times'],
            },
          },
        ],
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
    ],
  },
});
