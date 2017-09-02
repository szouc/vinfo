import { db } from '../../settings/db'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const baseCompany = {
  name: {
    type: String,
    trim: true,
    required: true
  },
  addr: {
    type: String,
    trim: true,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
}

const CompanySchema = new Schema(baseCompany)

CompanySchema.index({ name: 1, addr: 1 }, { unique: true })

const Company = db.model('Company', CompanySchema)

export { Company }
