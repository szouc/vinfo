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
    vender: [
      'debug',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'redux',
      'react-redux',
      'reselect',
      'redux-form',
      'redux-saga/lib',
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
