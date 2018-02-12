import { Product } from './models'
import {
  generateQueryCallback,
  returnPromiseOrExec,
  addPagination
} from '../../utils/dbService'

const createProduct = (product, callback) => {
  if (typeof callback === 'function') {
    return Product.create(
      product,
      generateQueryCallback('无法创建该产品。', callback)
    )
  }
  return Product.create(product)
}

const getProductByQuery = (query, callback) => {
  const dbQuery = Product.findOne(query)
  return returnPromiseOrExec(dbQuery, '没有找到该产品。', callback)
}

const getProductsByQuery = (query, callback) => {
  const dbQuery = Product.find(query)
  return returnPromiseOrExec(dbQuery, '没有找到该产品。', callback)
}

const getAllProducts = callback => {
  return getProductsByQuery({ active: true }, callback)
}

const getProductsWithPagination = () =>
  addPagination(getAllProducts, null, { name: 1 })

const getProductById = (id, callback) => {
  const dbQuery = Product.findById(id)
  return returnPromiseOrExec(dbQuery, '没有找到该产品。', callback)
}

const updateProductById = (id, update, callback) => {
  const dbQuery = Product.findByIdAndUpdate(id, { $set: update }, { new: true })
  return returnPromiseOrExec(dbQuery, '没有找到该产品。', callback)
}

const deleteProductById = (id, callback) => {
  const dbQuery = Product.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  )
  return returnPromiseOrExec(dbQuery, '没有找到该产品。', callback)
}

const addProductPriceHistory = (id, priceHistory, callback) => {
  return Product.findByIdAndUpdate(
    id,
    {
      $addToSet: { price_history: { $each: priceHistory } }
    },
    { new: true }
  )
    .lean()
    .exec(generateQueryCallback('没有找到该产品。', callback))
}

const deleteProductPriceHistory = (id, childId, callback) => {
  return Product.findById(id)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该产品。'))
      }
      doc.price_history.id(childId).remove()
      return doc.save(generateQueryCallback('无法删除历史价格。', callback))
    })
    .catch(err => callback(err))
}

export {
  createProduct,
  getProductByQuery,
  getProductsByQuery,
  getProductsWithPagination,
  getAllProducts,
  getProductById,
  addProductPriceHistory,
  deleteProductPriceHistory,
  updateProductById,
  deleteProductById
}
