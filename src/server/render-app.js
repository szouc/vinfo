// @flow

import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/utils'

const renderApp = (title: string) =>
  `<!doctype html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="${STATIC_PATH}/css/antd.css">
    </head>
    <body>
      <div class="${APP_CONTAINER_CLASS}"></div>
      <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}`}/js/manifest.js"></script>
      <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}`}/js/vendor.js"></script>
      <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}`}/js/bundle.js"></script>
    </body>
  </html>
  `

export default renderApp
