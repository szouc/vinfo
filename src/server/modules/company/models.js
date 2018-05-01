import { db } from '../../settings/db'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const companyFields = {
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
  abbr: {
    type: String,
    trim: true
  },
  logo: {
    type: String
  },
  phone: {
    type: String
  },
  legalPerson: {
    type: String
  },
  taxNumber: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
}

const CompanySchema = new Schema(companyFields, { timestamps: true })

CompanySchema.index({ name: 1, addr: 1 }, { unique: true })

const Company = db.model('Company', CompanySchema)

export { CompanySchema, Company }
