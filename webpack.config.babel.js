import { STATIC_PATH, WDS_PORT } from './src/shared/config'

import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import cssNext from 'postcss-cssnext'
import eslintFormatter from 'eslint-friendly-formatter'
import { isProd } from './src/shared/utils'
import nodeExternals from 'webpack-node-externals'
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
// Common Config
//
//

const config = {
  output: {
    path: outputPath,
    pathinfo: !isProd
  },

  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|gif|png|svg|otf|eot|woff|woff2|ttf)(\?.*)?$/,
        use: [
          {
            // https://github.com/webpack-contrib/file-loader
            loader: 'file-loader',
            options: {
              name: !isProd ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|mp3|wav|webm)(\?.*)?$/,
        use: [
          {
            // https://github.com/webpack-contrib/url-loader
            loader: 'url-loader',
            options: {
              name: !isProd ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
              limit: 10000
            }
          }
        ]
      }
    ]
  },

  // Abort the compilation on first error if true
  bail: !isProd,

  cache: isProd,

  // https://webpack.js.org/api/node/#stats-object
  stats: {
    colors: true,
    reasons: isProd,
    hash: !isProd,
    version: !isProd,
    timings: true,
    chunks: !isProd,
    chunkModules: !isProd,
    cached: !isProd,
    cachedAssets: !isProd
  }
}

//
//
// Client Bundle Config
//
//

const clientConfig = {
  ...config,

  target: 'web',

  entry: {
    bundle: isProd
      ? ['babel-polyfill', clientPath]
      : [
        'babel-polyfill',
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${WDS_PORT}`,
        'webpack/hot/only-dev-server',
        clientPath
      ]
  },

  output: {
    ...config.output,
    filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    sourceMapFilename: isProd ? 'js/[name].[chunkhash].map' : 'js/[name].map',
    chunkFilename: isProd
      ? 'js/[name].[chunkhash].chunk.js'
      : 'js/[name].chunk.js',
    publicPath: isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/`
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
      ...config.module.rules,
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
              cacheDirectory: !isProd,
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
                ...(isProd
                  ? []
                  : [
                    'flow-react-proptypes',
                    'react-hot-loader/babel',
                    'transform-react-jsx-source',
                    'transform-react-jsx-self'
                  ])
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
                sourceMap: !isProd,
                // modules: true,
                minimize: isProd,
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
                sourceMap: !isProd,
                modules: true,
                localIdentName: !isProd
                  ? '[name]-[local]-[hash:base64:5]'
                  : '[hash:base64:5]',
                minimize: isProd,
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

  devtool: isProd ? false : 'cheap-eval-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: outputPath,
    publicPath: isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/`,
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
      'process.env.NODE_ENV': isProd
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      'process.env.BROWSER': true,
      __DEV__: !isProd
    }),

    // https://github.com/kossnocorp/assets-webpack-plugin
    new AssetsPlugin({
      path: outputPath,
      filename: 'assets.json',
      prettyPrint: true
    }),

    new ExtractTextPlugin({
      filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css',
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

    ...(isProd
      ? [
        // https://github.com/johnagan/clean-webpack-plugin
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        // https://webpack.js.org/plugins/hashed-module-ids-plugin/
        new webpack.HashedModuleIdsPlugin({
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 20
        }),

        // // https://webpack.js.org/plugins/commons-chunk-plugin/
        // // Common Chunk from node_modules
        // new webpack.optimize.CommonsChunkPlugin({
        //   names: 'vendor',
        //   minChunks: module => /node_modules/.test(module.resource)
        //   // minChunks: ({ resource }) => (
        //   //   resource &&
        //   //   resource.indexOf('node_modules') >= 0 &&
        //   //   resource.match(/\.js$/)
        //   // )
        // }),

        // // Common Chunk from the lazy import modules
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'bundle',
        //   children: true,
        //   async: 'common-in-lazy',
        //   // minChunks: module => /node_modules/.test(module.resource)
        //   minChunks: ({ resource }) => (
        //     resource &&
        //     resource.includes('node_modules') &&
        //     /antd/.test(resource)
        //   )
        // }),

        // // Common Chunk from the lazy modules
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'bundle',
        //   children: true,
        //   async: 'many-used',
        //   minChunks: (module, count) => (
        //     count >= 2
        //   )
        // }),

        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'manifest',
        //   minChunks: Infinity
        // }),

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
      : [
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
      ])
  ]
}

//
//
// Server Bundle Config
//
//

export const serverConfig = {
  ...config,

  target: 'node',

  entry: {
    server: ['babel-polyfill', serverPath]
  },

  output: {
    ...config.output,
    filename: 'server/[name].js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: [nodeModulesPath, serverPath, sharedPath]
  },

  module: {
    rules: [
      ...config.module.rules,
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter
            }
          }
        ],
        include: [srcPath]
      },
      {
        test: /\.js$/,
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
                [
                  'env',
                  {
                    targets: {
                      node: 'current'
                    },
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
                ['transform-runtime']
              ]
            }
          }
        ],
        include: [srcPath]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProd
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      'process.env.BROWSER': false,
      __DEV__: !isProd
    }),

    // https://webpack.js.org/plugins/limit-chunk-count-plugin/
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1 // Only one file for the server bundle
    })
  ],

  // externals: nodeModules,
  // tells Webpack not to bundle those modules in the node_modules folder
  externals: [nodeExternals()],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  devtool: isProd ? 'source-map' : 'cheap-module-source-map'
}

export default clientConfig
