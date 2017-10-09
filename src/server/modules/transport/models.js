import { db } from '../../settings/db'
import mongoose from 'mongoose'
import incrementCreator from 'mongoose-sequence'
import { ASSIGN, ACCEPT, SUBMIT, PASS, DENY } from './constants'

const Schema = mongoose.Schema

const CAPTAIN_STATUS = [ASSIGN, ACCEPT, SUBMIT, PASS, DENY]
const ACCOUNT_STATUS = [SUBMIT, PASS, DENY]

const baseTransport = {
  assigner: {
    username: { type: String, required: true },
    fullname: { type: String, required: true }
  },
  vehicle: {
    _id: { type: Schema.Types.ObjectId, required: true, ref: 'Vehicle' },
    plate: { type: String },
    engine: { type: String }
  },
  principal: {
    username: { type: String, required: true },
    fullname: { type: String, required: true }
  },
  secondary: {
    username: { type: String, required: true },
    fullname: { type: String, required: true }
  },
  from: {
    company: {
      _id: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
      name: { type: String },
      addr: { type: String }
    },
    weight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() }
  },
  to: {
    company: {
      _id: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
      name: { type: String },
      addr: { type: String }
    },
    weight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() }
  },
  product: {
    _id: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    name: { type: String },
    specs: { type: String }
  },
  captain_status: {
    type: String,
    enum: CAPTAIN_STATUS,
    default: ASSIGN,
    required: true
  },
  captain_info: { type: String },
  price: { type: Number, required: true, default: 0 },
  accountant_status: {
    type: String,
    enum: ACCOUNT_STATUS,
    default: SUBMIT,
    required: true
  },
  accountant: {
    username: { type: String },
    fullname: { type: String }
  },
  accountant_info: { type: String },
  active: { type: Boolean, default: true }
}

const TransportSchema = new Schema(baseTransport)

db.Schema = Schema
const AutoIncrement = incrementCreator(db)
TransportSchema.plugin(AutoIncrement, { inc_field: 'num' })

const Transport = db.model('Transport', TransportSchema)

export { Transport }
