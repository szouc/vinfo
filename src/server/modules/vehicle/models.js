import { db } from '../../settings/db'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const fuel = {
  applicant: { type: Schema.Types.ObjectId, ref: 'User' },
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
    type: Boolean
  },
  info: {
    type: String
  }
}

const FuelSchema = new Schema(fuel)

const maintain = {
  applicant: { type: Schema.Types.ObjectId, ref: 'User' },
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

const driver = {
  principal: { type: Schema.Types.ObjectId, ref: 'User' },
  secondary: { type: Schema.Types.ObjectId, ref: 'User' },
  is_default: { type: Boolean, default: false }
}

const DriverSchema = new Schema(driver)

const baseVehicle = {
  plate: {
    type: String,
    trim: true,
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
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  drivers: [DriverSchema],
  fuels: [FuelSchema],
  maintenance: [MaintainSchema]
}

const VehicleSchema = new Schema(baseVehicle)

const Vehicle = db.model('Vehicle', VehicleSchema)

export { Vehicle }
