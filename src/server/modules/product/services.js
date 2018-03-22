import moment from 'moment'
import { Observable } from 'rxjs'
import { Product } from './models'
import * as Page from '../../utils/pagination'

const PROJECTION = 'name specs pricing created active price_history'

const createProduct = product => Observable.fromPromise(Product.create(product))

const getProductByQuery = query =>
  Observable.fromPromise(
    Product.findOne(query, PROJECTION)
      .lean()
      .exec()
  )

const getProductsByQuery = query =>
  Observable.fromPromise(
    Product.find(query, PROJECTION)
      .lean()
      .exec()
  )

const getAllProducts = () => getProductsByQuery({ active: true })

const getProductsPagination = Page.producePagination(Product)

const getProductsData = Page.getModelSortedData(Product, PROJECTION, 'name')

const getProductsWithPg = (pageNumber, pageSize, values = {}) => {
  let active = { active: true }
  let fromDate = values.fromDate ? { $gte: moment(values.fromDate) } : {}
  let toDate = values.toDate ? { $lte: moment(values.toDate) } : {}
  let dateRange =
    values.fromDate || values.toDate
      ? { created: { ...fromDate, ...toDate } }
      : {}
  let query = { ...active, ...dateRange }
  return Page.addPagination(
    getProductsPagination(pageNumber, pageSize, query),
    getProductsData(pageNumber, pageSize, query)
  )
}

const getProductById = id =>
  Observable.fromPromise(
    Product.findById(id, PROJECTION)
      .lean()
      .exec()
  )

const updateProductById = (id, update) =>
  Observable.fromPromise(
    Product.findByIdAndUpdate(id, { $set: update }, { new: true })
      .select(PROJECTION)
      .lean()
      .exec()
  )

const deleteProductById = id =>
  Observable.fromPromise(
    Product.findByIdAndUpdate(id, { active: false }, { new: true })
      .select(PROJECTION)
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
      .select(PROJECTION)
      .lean()
      .exec()
  )

const deleteProductPriceHistory = (id, childId) =>
  Observable.fromPromise(Product.findById(id, PROJECTION))
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
