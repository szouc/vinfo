import { db } from '../../settings/db'
import mongoose from 'mongoose'
import incrementCreator from 'mongoose-sequence'
import { CAPTAIN_STATUS, ACCOUNT_STATUS, ASSIGN, SUBMIT } from './constants'

const Schema = mongoose.Schema

const transportFields = {
  assigner: { type: String, required: true, ref: 'User' },
  assignerName: { type: String, required: true },
  vehicle: { type: Schema.Types.ObjectId, required: true, ref: 'Vehicle' },
  plate: { type: String, required: true },
  engine: { type: String },
  principal: { type: String, ref: 'User' },
  principalName: { type: String },
  secondary: { type: String, ref: 'User' },
  secondaryName: { type: String },
  fromCompany: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
  fromName: { type: String, required: true },
  fromAddr: { type: String, required: true },
  fromWeight: { type: Number },
  fromDate: { type: Date },
  toCompany: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
  toName: { type: String, required: true },
  toAddr: { type: String, required: true },
  toWeight: { type: Number },
  toDate: { type: Date },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  productName: { type: String, required: true },
  productSpecs: { type: String, required: true },
  shippingPic: { type: String },
  captainStatus: {
    type: String,
    enum: CAPTAIN_STATUS,
    default: ASSIGN,
    required: true
  },
  captainInfo: { type: String },
  price: { type: Number, required: true, default: 0 },
  accountantStatus: {
    type: String,
    enum: ACCOUNT_STATUS,
    default: SUBMIT,
    required: true
  },
  accountant: { type: String, ref: 'User' },
  accountantName: { type: String },
  accountantInfo: { type: String },
  active: { type: Boolean, default: true }
}

const TransportSchema = new Schema(transportFields, { timestamps: true })

db.Schema = Schema
const AutoIncrement = incrementCreator(db)
TransportSchema.plugin(AutoIncrement, { inc_field: 'num' })

const Transport = db.model('Transport', TransportSchema)

export { TransportSchema, Transport }
