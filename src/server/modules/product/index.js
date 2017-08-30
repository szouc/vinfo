import express from 'express'

import {
  PRODUCT_ID_ROUTE,
  // PRODUCT_QUERY_ROUTE,
  PRODUCT_PRICE_HISTORY_ROUTE,
  PRODUCT_PRICE_HISTORY_ID_ROUTE
} from './routes'

import {
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createProduct,
  addProductPriceHistory,
  deleteProductPriceHistory
} from './controllers'

import { permitCaptain, permitManager } from './permissions'

const productRouter = express.Router()

productRouter
  .route('/')
  .get(permitCaptain, getAllProducts)
  .post(permitManager, createProduct)

// Dynamic route should put the last position
productRouter
  .route(PRODUCT_ID_ROUTE)
  .get(permitCaptain, getProductById)
  .put(permitManager, updateProductById)
  .delete(permitManager, deleteProductById)

productRouter
  .route(PRODUCT_PRICE_HISTORY_ROUTE)
  .post(permitManager, addProductPriceHistory)

productRouter
  .route(PRODUCT_PRICE_HISTORY_ID_ROUTE)
  .delete(permitManager, deleteProductPriceHistory)

export default productRouter
