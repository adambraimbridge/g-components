/**
 * @file
 * Rollup config for production builds
 */

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const common = {
  input: './index.js',
  plugins: [
    babel({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      presets: [['env', { modules: false }], 'react'],
      plugins: [
        'external-helpers',
        'transform-runtime',
        'transform-object-rest-spread',
        'transform-class-properties',
      ],
    }),
    json(),
    resolve({
      browser: true,
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
  ],
};

export default [
  {
    ...common,
    output: {
      format: 'umd',
      file: pkg.main,
      name: 'GComponents',
      exports: 'named',
      globals: {
        react: 'React',
      },
    },
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [...common.plugins, terser()],
  },
  {
    ...common,
    output: {
      format: 'umd',
      file: pkg.main.replace('.min', ''),
      name: 'GComponents',
      exports: 'named',
      globals: {
        react: 'React',
      },
    },
    external: Object.keys(pkg.peerDependencies || {}),
  },
  {
    ...common,
    output: {
      format: 'es',
      file: pkg.module,
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [...common.plugins, terser()],
  },
  {
    ...common,
    output: {
      format: 'es',
      file: pkg.module.replace('.min', ''),
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  },
];
