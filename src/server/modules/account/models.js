import { db } from '../../settings/db'
import mongoose from 'mongoose'
import { SUBMIT, PASS, DENY } from './constants'

const Schema = mongoose.Schema

const ACCTION_STATUS = [SUBMIT, PASS, DENY]

const baseAccount = {
  transport: { type: Schema.Types.ObjectId, required: true, ref: 'Transport' },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ACCTION_STATUS,
    default: SUBMIT,
    required: true
  }
}

const AccountSchema = new Schema(baseAccount)

const Account = db.model('Account', AccountSchema)

export { Account }
