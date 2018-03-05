import { Observable } from 'rxjs'
import { Product } from './models'
import * as Page from '../../utils/pagination'

const createProduct = product => Observable.fromPromise(Product.create(product))

const getProductByQuery = query =>
  Observable.fromPromise(
    Product.findOne(query)
      .lean()
      .exec()
  )

const getProductsByQuery = query =>
  Observable.fromPromise(
    Product.find(query)
      .lean()
      .exec()
  )

const getAllProducts = () => getProductsByQuery({ active: true })

const getProductsPagination = Page.producePagination(Product)

const getProductsData = Page.getModelSortedData(Product, 'name')

const getProductsWithPg = (pageNumber, pageSize, ...rest) => {
  let query = { active: true }
  return Page.addPagination(
    getProductsPagination(pageNumber, pageSize, query),
    getProductsData(pageNumber, pageSize, query)
  )
}

const getProductById = id =>
  Observable.fromPromise(
    Product.findById(id)
      .lean()
      .exec()
  )

const updateProductById = (id, update) =>
  Observable.fromPromise(
    Product.findByIdAndUpdate(id, { $set: update }, { new: true })
      .lean()
      .exec()
  )

const deleteProductById = id =>
  Observable.fromPromise(
    Product.findByIdAndUpdate(id, { active: false }, { new: true })
      .lean()
      .exec()
  )

const addProductPriceHistory = (id, priceHistory) =>
  Observable.fromPromise(
    Product.findByIdAndUpdate(
      id,
      {
        $addToSet: { price_history: { $each: priceHistory } }
      },
      { new: true }
    )
      .lean()
      .exec()
  )

const deleteProductPriceHistory = (id, childId) =>
  Observable.fromPromise(Product.findById(id))
    .do(doc => {
      if (doc) {
        doc.price_history.id(childId).remove()
      }
    })
    .switchMap(doc => {
      if (!doc) {
        return Observable.throw({ message: '没有找到相关产品。' })
      }
      return Observable.fromPromise(doc.save())
    })

export {
  createProduct,
  getProductByQuery,
  getProductsByQuery,
  getProductsWithPg,
  getAllProducts,
  getProductById,
  addProductPriceHistory,
  deleteProductPriceHistory,
  updateProductById,
  deleteProductById
}
