/**
 * @file
 * Custom Webpack config for Storybook.
 * This isn't used for any actual bundling; we use Rollup for that.
 */

const BowerResolvePlugin = require('bower-resolve-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const glob = require('glob');

module.exports = (mode = 'production') => {
  const BASECONFIG = {
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
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    entry: {
      index: './index.js',
    },
    resolve: {
      modules: ['bower_components', 'node_modules'],
      plugins: [new BowerResolvePlugin()],
      descriptionFiles: ['bower.json', 'package.json'],
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
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: ['bower_components'],
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
  };

  return [
    BASECONFIG,
    mode === 'production' && {
      ...BASECONFIG,
      entry: {
        ...glob.sync(path.join(__dirname, 'components', '*')).reduce(
          (a, c) => ({
            ...a,
            [path.basename(c)]: c,
          }),
          {},
        ),
      },
      output: {
        libraryTarget: 'umd',
        path: __dirname,
        filename: 'dist/[name]/index.js',
        library: 'G[name]',
        umdNamedDefine: true,
        sourceMapFilename: 'dist/[name]/index.map',
      },
    },
  ];
};
