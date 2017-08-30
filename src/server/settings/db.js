// Import the mongoose module
import mongoose from 'mongoose'
import { DB_URI, TEST_URI } from './constants'
import { isProd, isTest } from '../../shared/utils'

mongoose.Promise = global.Promise

// Set up default mongoose connection
const options = isTest
  ? {
    useMongoClient: true
  }
  : {
    useMongoClient: true,
    autoReconnect: true,
    keepAlive: true,
    socketTimeoutMS: 0,
    reconnectTries: 30,
    config: {
      autoIndex: !isProd
    }
  }

const URI = isTest ? TEST_URI : DB_URI

const db = mongoose.createConnection(URI, options)

export { db }
