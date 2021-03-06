// @flow

// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
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
      'axios',
      'ramda',
      'moment',
      'babel-polyfill',
      'history',
      'localforage',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'react-loadable',
      'redux',
      'redux-immutable',
      'redux-actions',
      'redux-saga',
      'react-redux',
      'normalizr',
      'reselect',
      'redux-form',
      'redux-logger',
      'immutable'
    ]
  },

  output: {
    path: outputPath,
    filename: '[name].dll.js',
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
              cacheDirectory: true,
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
                'syntax-dynamic-import',
                'flow-react-proptypes',
                'react-hot-loader/babel',
                'transform-react-jsx-source',
                'transform-react-jsx-self'
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

  devtool: 'cheap-eval-source-map',

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
