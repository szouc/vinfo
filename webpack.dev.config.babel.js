import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from './webpack.config.babel'

const webpackDevConfig = {
  ...config,
  ...config.plugins.push(
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  )
}

export default webpackDevConfig
