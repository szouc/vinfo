import mongoose from 'mongoose'
import { DB_URI } from './constants'
import { isProd } from '../../shared/utils'

mongoose.Promise = global.Promise

class Connection {
  static _conn = null
  static getConnection() {
    if (Connection._conn === null) {
      Connection._conn = Connection._createConnection()
    }
    return Connection._conn
  }

  static _createConnection() {
    const options = {
      useMongoClient: true,
      autoReconnect: true,
      keepAlive: true,
      socketTimeoutMS: 0,
      reconnectTries: 30,
      config: {
        autoIndex: !isProd
      }
    }
    const db = mongoose.createConnection(DB_URI, options)
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function() {
      console.log('Database connected successfully!')
    })
    return db
  }
}

class Test {
  static _conn = null
  static getConnection() {
    if (Connection._conn === null) {
      Connection._conn = mongoose.createConnection(
        'mongodb://test:test@127.0.0.1:27017/test',
        {
          useMongoClient: true,
          autoReconnect: false
        }
      )
      Connection._conn.on(
        'error',
        console.error.bind(console, 'test connection error:')
      )
      Connection._conn.once('open', function() {
        console.log('Test Database connected successfully!')
      })
    }
    return Connection._conn
  }
}

const conn = process.env.NODE_ENV === 'test' ? Test : Connection

export default conn
