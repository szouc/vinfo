// @flow

import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'

const renderApp = (title: string) =>
  `<!doctype html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="${STATIC_PATH}/css/antd.css">
    </head>
    <body>
      <div class="${APP_CONTAINER_CLASS}"></div>
      <script src="${`${STATIC_PATH}/js/vender.dll.js`}"></script>
      <script src="${`http://localhost:${WDS_PORT}`}/js/bundle.js"></script>
    </body>
  </html>
  `

export default renderApp
