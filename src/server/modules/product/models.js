import mongoose from 'mongoose'
import { db } from '../../settings/db'

// const db = conn.getConnection()
const Schema = mongoose.Schema

const priceHistoryFields = {
  price: {
    type: Number,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
}

const PriceHistorySchema = new Schema(priceHistoryFields, { timestamps: true })

const productFields = {
  name: {
    type: String,
    trim: true,
    required: true
  },
  specs: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  pricing: {
    type: Number
  },
  priceHistory: [PriceHistorySchema],
  active: {
    type: Boolean,
    default: true
  }
}

const ProductSchema = new Schema(productFields, { timestamps: true })

// Add unique index: {name, specs}
ProductSchema.index({ name: 1, specs: 1 }, { unique: true })

const Product = db.model('Product', ProductSchema)

export { ProductSchema, Product }
