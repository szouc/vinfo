import { db } from '../../settings/db'
import mongoose from 'mongoose'
import incrementCreator from 'mongoose-sequence'
import { ASSIGN, ACCEPT, SUBMIT, PASS, DENY } from './constants'

const Schema = mongoose.Schema

const CAPTAIN_STATUS = [ASSIGN, ACCEPT, SUBMIT, PASS, DENY]
const ACCOUNT_STATUS = [SUBMIT, PASS, DENY]

const baseTransport = {
  vehicle: {
    _id: { type: Schema.Types.ObjectId, required: true },
    plate: { type: String, required: true },
    engine: { type: String, required: true }
  },
  drivers: {
    principal: {
      _id: { type: Schema.Types.ObjectId, required: true },
      username: { type: String, required: true },
      fullname: { type: String, required: true }
    },
    secondary: {
      _id: { type: Schema.Types.ObjectId, required: true },
      username: { type: String, required: true },
      fullname: { type: String, required: true }
    }
  },
  from: {
    company: {
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      addr: { type: String, required: true }
    },
    weight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() }
  },
  to: {
    company: {
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      addr: { type: String, required: true }
    },
    weight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() }
  },
  product: {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    specs: { type: String, required: true }
  },
  status: {
    type: String,
    enum: CAPTAIN_STATUS,
    default: ASSIGN,
    required: true
  },
  info: { type: String },
  price: { type: Number, required: true, default: 0 },
  account_status: {
    type: String,
    enum: ACCOUNT_STATUS,
    default: SUBMIT,
    required: true
  },
  account_info: { type: String },
  active: { type: Boolean, default: true }
}

const TransportSchema = new Schema(baseTransport)

db.Schema = Schema
const AutoIncrement = incrementCreator(db)
TransportSchema.plugin(AutoIncrement, { inc_field: 'num' })

const Transport = db.model('Transport', TransportSchema)

export { Transport }