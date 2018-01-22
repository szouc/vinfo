import { WDS_PORT } from './src/shared/config'

import { baseConfig } from './webpack.base.config.babel'
import AssetsPlugin from 'assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import cssNext from 'postcss-cssnext'
import eslintFormatter from 'eslint-friendly-formatter'
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

//
//
// Client Bundle Config
//
//

const clientConfig = {
  ...baseConfig,

  target: 'web',

  entry: {
    bundle:
       [
         'babel-polyfill',
         'react-hot-loader/patch',
         clientPath
       ]
  },

  output: {
    ...baseConfig.output,
    filename: 'js/[name].js',
    sourceMapFilename: 'js/[name].map',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: `http://localhost:${WDS_PORT}/`
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
              cacheDirectory: true,
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
                ],
                'flow-react-proptypes',
                'react-hot-loader/babel',
                'transform-react-jsx-source',
                'transform-react-jsx-self'
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
                sourceMap: true,
                // modules: true,
                minimize: false,
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
                sourceMap: true,
                modules: true,
                localIdentName: '[name]-[local]-[hash:base64:5]',
                minimize: false,
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

  devtool: 'cheap-eval-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: outputPath,
    publicPath: `http://localhost:${WDS_PORT}/`,
    port: WDS_PORT,
    hot: true,
    stats: {
      color: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  plugins: [
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BROWSER': true,
      __DEV__: true
    }),

    // https://github.com/kossnocorp/assets-webpack-plugin
    new AssetsPlugin({
      path: outputPath,
      filename: 'assets.json',
      prettyPrint: true
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].css',
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
    new webpack.DllReferencePlugin({
      context: __dirname,
      // flow-disable-next-line
      manifest: require('./dist/vendors-manifest.json'),
      sourceType: 'commonsjs2'
    }),

    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // https://webpack.js.org/plugins/no-emit-on-errors-plugin/
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/th0r/webpack-bundle-analyzer
    // default host : 127.0.0.1 , port : 8888
    new BundleAnalyzerPlugin()
  ]
}

export default clientConfig
