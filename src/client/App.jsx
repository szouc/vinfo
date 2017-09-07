import React from 'react'
import BaseRoute from './route'
import moment from 'moment'
import localforage from 'localforage'

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// This will force localStorage as the storage
// driver even if another is available. You can
// use this instead of `setDriver()`.
localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'auth'
})

const App = () => <BaseRoute />

export default App
