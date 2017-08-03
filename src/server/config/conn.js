import mongoose from 'mongoose'
import { DB_URI } from './settings'

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
      db: {
        // Use ES6 Promise Library Class
        promiseLibrary: global.Promise
      },
      server: {
        socketOptions: {
          autoReconnect: true, // Reconnect on error
          keepAlive: 120// TCP KeepAlive on the socket
        }
      },
      promiseLibrary: global.Promise// Use ES6 Promise Library Class
    }
    const db = mongoose.createConnection(DB_URI, options)
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
      console.log('Database connected successfully!')
    })
    return db
  }
}
