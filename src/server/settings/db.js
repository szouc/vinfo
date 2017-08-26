import mongoose from 'mongoose'
import { DB_URI } from './constants'

mongoose.Promise = global.Promise

export default class Connection {
  static _conn = null;
  static getConnection () {
    if (Connection._conn === null) {
      Connection._conn = Connection._createConnection()
    }
    return Connection._conn
  }

  static _createConnection () {
    const options = {
      useMongoClient: true,
      autoReconnect: true,
      keepAlive: true,
      socketTimeoutMS: 0,
      reconnectTries: 30,
      promiseLibrary: global.Promise
    }
    const db = mongoose.createConnection(DB_URI, options)
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
      console.log('Database connected successfully!')
    })
    return db
  }
}
