import { STATIC_PATH } from './src/shared/config'

import {baseConfig} from './webpack.base.config.babel'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import cssNext from 'postcss-cssnext'
import eslintFormatter from 'eslint-friendly-formatter'
import { isProd } from './src/shared/utils'
import path from 'path'
import webpack from 'webpack'

const srcPath = path.resolve(__dirname, './src')
const clientPath = path.resolve(__dirname, './src/client')
const serverPath = path.resolve(__dirname, './src/server')
const sharedPath = path.resolve(__dirname, './src/shared')
const outputPath = path.resolve(__dirname, './dist')
const nodeModulesPath = path.resolve(__dirname, './node_modules')
const clientUtilsPath = path.resolve(__dirname, './src/client/utils')
const clientModulesPath = path.resolve(__dirname, './src/client/modules')
const clientModulesSharedPath = path.resolve(
  __dirname,
  './src/client/modules/shared'
)

const pathsToClean = ['dist', 'lib']

const cleanOptions = {
  root: path.resolve(__dirname),
  exclude: ['vendors-manifest.json', 'vendors.dll.js', 'uploads']
}

//
//
// Client Bundle Config
//
//

const clientConfig = {
  ...baseConfig,

  target: 'web',

  entry: {
    bundle: ['babel-polyfill', clientPath]
  },

  output: {
    ...baseConfig.output,
    filename: 'js/[name].[chunkhash].js',
    sourceMapFilename: 'js/[name].[chunkhash].map',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    publicPath: `${STATIC_PATH}/`
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [srcPath, nodeModulesPath],
    alias: {
      '@server': serverPath,
      '@client': clientPath,
      '@shared': sharedPath,
      '@clientModules': clientModulesPath,
      '@clientModulesShared': clientModulesSharedPath,
      '@clientUtils': clientUtilsPath
    }
  },

  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter
            }
          }
        ],
        exclude: [nodeModulesPath]
        // include: [
        //   path.resolve(__dirname, './src')
        // ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            // https://github.com/babel/babel-loader
            loader: 'babel-loader',
            options: {
              // https://babeljs.io/docs/usage/api/#options
              cacheDirectory: false,
              babelrc: false,
              presets: [
                // https://babeljs.io/docs/plugins/#presets
                [
                  'env',
                  {
                    modules: false,
                    useBuiltIns: false,
                    debug: false
                  }
                ],
                'react',
                'stage-0',
                'flow'
              ],
              plugins: [
                // https://babeljs.io/docs/plugins
                ['syntax-dynamic-import'],
                // ['transform-runtime'],
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'css'
                  }
                ]
              ]
            }
          }
        ],
        include: [srcPath]
      },
      {
        test: /\.css$/,
        // test (filePath) {
        //   return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
        // },
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: false,
                // modules: true,
                minimize: true,
                discardComments: { removeAll: true }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  cssNext({
                    browsers: [
                      'last 2 versions',
                      'Firefox ESR',
                      '> 1%',
                      'ie >= 8',
                      'iOS >= 8',
                      'Android >= 4'
                    ]
                  })
                ]
              }
            }
          ]
        }),
        exclude: [srcPath]
      },
      {
        test: /\.css$/,
        // test: /\.module\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: false,
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:5]',
                minimize: true,
                discardComments: { removeAll: true }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  cssNext({
                    browsers: [
                      'last 2 versions',
                      'Firefox ESR',
                      '> 1%',
                      'ie >= 8',
                      'iOS >= 8',
                      'Android >= 4'
                    ]
                  })
                ]
              }
            }
          ]
        }),
        include: [srcPath]
      }
    ]
  },

  devtool: false,

  plugins: [
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BROWSER': true,
      __DEV__: false
    }),

    // https://github.com/kossnocorp/assets-webpack-plugin
    new AssetsPlugin({
      path: outputPath,
      filename: 'assets.json',
      prettyPrint: true
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true
    }),

    // https://webpack.js.org/plugins/commons-chunk-plugin/
    // Common Chunk from node_modules
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: module =>
        module.resource &&
        /node_modules/.test(module.resource) &&
        module.resource.match(/\.js$/)
    }),

    // Common Chunk from the lazy import modules
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bundle',
      children: true,
      async: 'common-in-lazy',
      // minChunks: module => /node_modules/.test(module.resource)
      minChunks: ({ resource }) =>
        resource && resource.includes('node_modules')
    }),

    // Common Chunk from the lazy modules
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bundle',
      children: true,
      async: 'many-used',
      minChunks: (module, count) => count >= 2
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    // https://github.com/johnagan/clean-webpack-plugin new CleanWebpackPlugin(pathsToClean, cleanOptions),
    // https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),

    // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    new UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: !isProd,
        unused: true,
        dead_code: true
      },
      comments: false
    }),

    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.prod.html'
    })
  ]
}

export default clientConfig
