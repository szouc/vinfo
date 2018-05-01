import { db } from '../../settings/db'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const fuelFields = {
  applicant: { type: String, required: true, ref: 'User' },
  fullname: {
    type: String
  },
  litre: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  mile: {
    type: Number
  },
  isCheck: {
    type: Boolean,
    default: false
  },
  info: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}

const FuelSchema = new Schema(fuelFields, { timestamps: true })

const maintainFields = {
  applicant: { type: String, required: true, ref: 'User' },
  fullname: {
    type: String
  },
  reason: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  mile: {
    type: Number
  },
  detail: {
    type: String
  },
  isCheck: {
    type: Boolean,
    default: false
  },
  info: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}

const MaintainSchema = new Schema(maintainFields, { timestamps: true })

const vehicleFields = {
  plate: {
    type: String,
    required: true
  },
  engine: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  purchaseDate: {
    type: Date
  },
  initMile: {
    type: Number
  },
  principal: { type: String, ref: 'User' },
  principalName: { type: String },
  secondary: { type: String, ref: 'User' },
  secondaryName: { type: String },
  captain: { type: String, ref: 'User' },
  captainName: { type: String },
  assigned: { type: Boolean, default: false },
  active: {
    type: Boolean,
    default: true
  },
  fuels: [FuelSchema],
  maintenance: [MaintainSchema]
}

const VehicleSchema = new Schema(vehicleFields, { timestamps: true })

VehicleSchema.index({ plate: 1 }, { unique: true })

const Vehicle = db.model('Vehicle', VehicleSchema)

export { VehicleSchema, Vehicle }
