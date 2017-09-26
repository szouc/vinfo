import { db } from '../../settings/db'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const fuel = {
  applicant: {
    username: { type: String, required: true },
    fullname: { type: String, required: true }
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
  date: {
    type: Date,
    default: Date.now()
  },
  is_check: {
    type: Boolean,
    default: false
  },
  info: {
    type: String
  }
}

const FuelSchema = new Schema(fuel)

const maintain = {
  applicant: {
    username: { type: String, required: true },
    fullname: { type: String, required: true }
  },
  reason: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    default: 0
  },
  mile: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  },
  detail: {
    type: String
  },
  is_check: {
    type: Boolean
  },
  info: {
    type: String
  }
}

const MaintainSchema = new Schema(maintain)

const baseVehicle = {
  plate: {
    type: String,
    required: true
  },
  engine: {
    type: String,
    required: true
  },
  model: {
    type: String,
    trim: true
  },
  purchase_date: {
    type: Date
  },
  init_mile: {
    type: Number,
    default: 0
  },
  principal: {
    username: { type: String },
    fullname: { type: String }
  },
  secondary: {
    username: { type: String },
    fullname: { type: String }
  },
  assigned: { type: Boolean, default: false },
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  fuels: [FuelSchema],
  maintenance: [MaintainSchema]
}

const VehicleSchema = new Schema(baseVehicle)

VehicleSchema.index({ plate: 1, engine: 1 }, { unique: true })

const Vehicle = db.model('Vehicle', VehicleSchema)

export { Vehicle }
