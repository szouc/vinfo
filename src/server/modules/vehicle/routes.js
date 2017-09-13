import { db } from '../../settings/db'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

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
  }
}

const baseFuel = {
  applicant: {
    username: {
      type: String,
      required: true
    },
    fullname: {
      type: String
    }
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
  check: {
    type: Boolean,
    defalut: false
  },
  info: {
    type: String
  }
}

const FuelSchema = new Schema(baseFuel)

const baseMaintain = {
  applicant: {
    username: {
      type: String,
      required: true
    },
    fullname: {
      type: String
    }
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
  check: {
    type: Boolean,
    defalut: false
  },
  info: {
    type: String
  }
}

const MaintainSchema = new Schema(baseMaintain)

const VehicleSchema = new Schema(baseVehicle)

VehicleSchema.index({ name: 1, addr: 1 }, { unique: true })

const Vehicle = db.model('Company', VehicleSchema)

export { Vehicle }
