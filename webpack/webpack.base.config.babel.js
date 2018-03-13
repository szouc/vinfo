import { isProd } from './src/shared/utils'
import path from 'path'
const outputPath = path.resolve(__dirname, './dist')

//
//
// Common Config
//
//

export const baseConfig = {
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
