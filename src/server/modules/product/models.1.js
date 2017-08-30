import conn from '../../settings/db'
import mongoose from 'mongoose'

const db = conn.getConnection()
const Schema = mongoose.Schema

const basePriceHistory = {
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

const PriceHistorySchema = new Schema(basePriceHistory)

const baseProduct = {
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
  pricing: {
    type: Number,
    required: true
  },
  price_history: [ PriceHistorySchema ],
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
}

const ProductSchema = new Schema(baseProduct)

const Product = db.model('Product', ProductSchema)

export { Product }
