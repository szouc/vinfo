import { db } from '../../settings/db'
import mongoose from 'mongoose'
import incrementCreator from 'mongoose-sequence'
import { CAPTAIN_STATUS, ACCOUNT_STATUS, ASSIGN, SUBMIT } from './constants'

const Schema = mongoose.Schema

const baseTransport = {
  assigner: {
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    role: { type: String, required: true },
    created: { type: Date, required: true },
    active: { type: Boolean, required: true }
  },
  vehicle: {
    _id: { type: Schema.Types.ObjectId, required: true },
    plate: { type: String, required: true },
    engine: { type: String, required: true },
    model: { type: String },
    purchase_date: { type: Date },
    init_mile: { type: Number },
    principal: {
      username: { type: String },
      fullname: { type: String },
      gender: { type: String },
      role: { type: String },
      created: { type: Date },
      active: { type: Boolean }
    },
    secondary: {
      username: { type: String },
      fullname: { type: String },
      gender: { type: String },
      role: { type: String },
      created: { type: Date },
      active: { type: Boolean }
    },
    captain: {
      username: { type: String },
      fullname: { type: String },
      gender: { type: String },
      role: { type: String },
      created: { type: Date },
      active: { type: Boolean }
    },
    assigned: { type: Boolean, required: true },
    created: { type: Date, required: true },
    active: { type: Boolean, required: true }
  },
  principal: {
    username: { type: String },
    fullname: { type: String },
    gender: { type: String },
    role: { type: String },
    created: { type: Date },
    active: { type: Boolean }
  },
  secondary: {
    username: { type: String },
    fullname: { type: String },
    gender: { type: String },
    role: { type: String },
    created: { type: Date },
    active: { type: Boolean }
  },
  from: {
    company: {
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      addr: { type: String, required: true },
      phone: { type: String },
      legal_person: { type: String },
      tax_number: { type: String },
      created: { type: Date, required: true },
      active: { type: Boolean, required: true }
    },
    weight: { type: Number },
    date: { type: Date }
  },
  to: {
    company: {
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      addr: { type: String, required: true },
      phone: { type: String },
      legal_person: { type: String },
      tax_number: { type: String },
      created: { type: Date, required: true },
      active: { type: Boolean, required: true }
    },
    weight: { type: Number },
    date: { type: Date }
  },
  product: {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    specs: { type: String, required: true },
    pricing: { type: String },
    created: { type: Date, required: true },
    active: { type: Boolean, required: true }
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
    fullname: { type: String },
    gender: { type: String },
    role: { type: String },
    created: { type: Date },
    active: { type: Boolean }
  },
  accountant_info: { type: String },
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now }
}

const TransportSchema = new Schema(baseTransport)

db.Schema = Schema
const AutoIncrement = incrementCreator(db)
TransportSchema.plugin(AutoIncrement, { inc_field: 'num' })

const Transport = db.model('Transport', TransportSchema)

export { TransportSchema, Transport }
