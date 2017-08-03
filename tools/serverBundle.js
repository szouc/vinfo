import webpack from 'webpack'
import { serverConfig } from '../webpack.config.babel'

const bundle = webpack(serverConfig)

// watches for changes

// const watching = bundle.watch({
//   aggregateTimeout: 300,
//   poll: 1000
// }, (err, stats) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(stats.toString({chunks: false, colors: true}));
// });

bundle.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats.toString(serverConfig.stats))
})
