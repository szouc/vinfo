import { db } from '../../settings/db'
import mongoose from 'mongoose'
import { ASSIGN, ACCEPT, SUBMIT, PASS, DENY } from './constants'

const Schema = mongoose.Schema

const CAPTAIN_STATUS = [ASSIGN, ACCEPT, SUBMIT, PASS, DENY]

const baseTransport = {
  vehicle: { type: Schema.Types.ObjectId, required: true, ref: 'Vehicle' },
  drivers: {
    principal: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    secondary: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  from: {
    company: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
    weight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() }
  },
  to: {
    company: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
    weight: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() }
  },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  status: {
    type: String,
    enum: CAPTAIN_STATUS,
    default: ASSIGN,
    required: true
  },
  info: { type: String }
}

const TransportSchema = new Schema(baseTransport)

const Transport = db.model('Transport', TransportSchema)

export { Transport }
