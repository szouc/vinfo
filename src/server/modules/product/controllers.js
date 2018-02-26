import * as Service from './services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const createObserver = (res, errHint) => ({
  next: data => {
    if (!data) {
      return res.status(400).json({ ok: false, error: errHint })
    }
    if (data.doc) {
      if (data.doc.length === 0) {
        return res.status(400).json({ ok: false, error: errHint })
      }
      return res
        .status(200)
        .json({ ok: true, result: data.doc, pagination: data.pagination })
    }
    if (data.ok) {
      if (data.n === 0) {
        return res.status(400).json({ ok: false, error: errHint })
      }
    }
    return res.status(200).json({ ok: true, result: data })
  },
  error: err => {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

const createProduct = (req, res) => {
  let product = req.body
  const createProduct$ = Service.createProduct(product)
  createProduct$.subscribe(createObserver(res, '无法创建产品。'))
}

const getProductsWithPagination = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  const getProductsWithPagination$ = Service.getProductsWithPagination(
    page,
    size
  )
  getProductsWithPagination$.subscribe(
    createObserver(res, '没有找到相关产品。')
  )
}

const getAllProducts = (req, res) => {
  const getAllProducts$ = Service.getAllProducts()
  getAllProducts$.subscribe(createObserver(res, '没有找到产品，请添加。'))
}

const getProductById = (req, res) => {
  let productId = req.params.id
  const getProductById$ = Service.getProductById(productId)
  getProductById$.subscribe(createObserver(res, '没有找到该产品。'))
}

const addProductPriceHistory = (req, res) => {
  let productId = req.params.id
  let priceHistory = req.body
  const addProductPriceHistory$ = Service.addProductPriceHistory(
    productId,
    priceHistory
  )
  addProductPriceHistory$.subscribe(createObserver(res, '无法添加历史价格。'))
}

const deleteProductPriceHistory = (req, res) => {
  let productId = req.params.id
  let priceHistoryId = req.params.childId
  const deleteProductPriceHistory$ = Service.deleteProductPriceHistory(
    productId,
    priceHistoryId
  )
  deleteProductPriceHistory$.subscribe(createObserver(res, '无法删除该产品。'))
}

const updateProductById = (req, res) => {
  let productId = req.params.id
  let update = req.body
  const updateProductById$ = Service.updateProductById(productId, update)
  updateProductById$.subscribe(createObserver(res, '没有找到相关产品。'))
}

const deleteProductById = (req, res) => {
  let productId = req.params.id
  const deleteProductById$ = Service.deleteProductById(productId)
  deleteProductById$.subscribe(createObserver(res, '没有找到相关产品。'))
}

export {
  createProduct,
  getProductsWithPagination,
  getAllProducts,
  getProductById,
  addProductPriceHistory,
  deleteProductPriceHistory,
  updateProductById,
  deleteProductById
}
