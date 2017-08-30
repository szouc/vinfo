import conn from '../../settings/db'
import mongoose from 'mongoose'

const db = conn.getConnection()
const Schema = mongoose.Schema

const baseCompany = {
  name: {
    type: String,
    trim: true,
    unique: true,
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

const Company = db.model('Company', CompanySchema)

export { Company }
