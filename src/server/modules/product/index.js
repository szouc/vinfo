import express from 'express'

import * as Route from './routes'

import * as Controller from './controllers'

import { permitManager } from './permissions'

const productRouter = express.Router()

productRouter
  .route('/')
  .all(permitManager)
  .get(Controller.getProductsWithPagination)
  .post(Controller.createProduct)

productRouter
  .route(Route.PRODUCT_ALL)
  .all(permitManager)
  .get(Controller.getAllProducts)

// Dynamic route should put the last position
productRouter
  .route(Route.PRODUCT_ID)
  .all(permitManager)
  .get(Controller.getProductById)
  .put(Controller.updateProductById)
  .delete(Controller.deleteProductById)

productRouter
  .route(Route.PRODUCT_PRICE_HISTORY)
  .post(permitManager, Controller.addProductPriceHistory)

productRouter
  .route(Route.PRODUCT_PRICE_HISTORY_ID)
  .delete(permitManager, Controller.deleteProductPriceHistory)

export default productRouter
