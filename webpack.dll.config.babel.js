// @flow

// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import { isProd } from './src/shared/utils'
import path from 'path'
import webpack from 'webpack'

const srcPath = path.resolve(__dirname, './src')
const outputPath = path.resolve(__dirname, './dist')
const nodeModulesPath = path.resolve(__dirname, './node_modules')

//
//
// Bundle DLL Config
//
//

const dllConfig = {
  entry: {
    vendors: [
      'antd/es',
      'babel-polyfill',
      'localforage',
      'react',
      'react-dom',
      'history',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'react-loadable',
      'redux',
      'redux-immutable',
      'redux-actions',
      'redux-saga/lib',
      'redux-saga/es',
      'react-redux',
      'redux-persist-immutable',
      'normalizr',
      'reselect',
      'redux-form/es',
      'redux-form/lib',
      'redux-logger',
      'immutable'
    ]
  },

  output: {
    path: outputPath,
    filename: 'js/[name].dll.js',
    library: '[name]_library'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      srcPath,
      nodeModulesPath
    ]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            // https://github.com/babel/babel-loader
            loader: 'babel-loader',
            options: {
              // https://babeljs.io/docs/usage/api/#options
              cacheDirectory: !isProd,
              babelrc: false,
              presets: [
                // https://babeljs.io/docs/plugins/#presets
                ['env', {
                  modules: false,
                  useBuiltIns: false,
                  debug: false
                }],
                'react',
                'stage-0',
                'flow'
              ],
              plugins: [
                // https://babeljs.io/docs/plugins
                ['syntax-dynamic-import'],
                ...isProd ? [] : ['flow-react-proptypes'],
                ...isProd ? [] : ['react-hot-loader/babel'],
                ...isProd ? [] : ['transform-react-jsx-source'],
                ...isProd ? [] : ['transform-react-jsx-self']
              ]
            }
          }
        ],
        include: [
          srcPath
        ]
      }
    ]
  },

  devtool: isProd ? false : 'cheap-eval-source-map',

  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_library',
      path: path.join(__dirname, './dist', '[name]-manifest.json')
    }),

    // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    new UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
        unused: true,
        dead_code: true
      },
      comments: false
    })

    // https://github.com/th0r/webpack-bundle-analyzer
    // default host : 127.0.0.1 , port : 8888
    // new BundleAnalyzerPlugin()
  ]
}

export default dllConfig
