import * as Service from './services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const generateResponseCallback = res => (err, doc) => {
  if (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
  res.status(200).json({ ok: true, result: doc })
}

const createProduct = (req, res) => {
  let product = req.body
  Service.createProduct(product, generateResponseCallback(res))
}

const getProducts = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  Service.getProducts(page, size, generateResponseCallback(res))
}

const getAllProducts = (req, res) => {
  Service.getAllProducts(generateResponseCallback(res))
}

const getProductById = (req, res) => {
  let productId = req.params.id
  Service.getProductById(productId, generateResponseCallback(res))
}

const addProductPriceHistory = (req, res) => {
  let productId = req.params.id
  let priceHistory = req.body
  Service.addProductPriceHistory(
    productId,
    priceHistory,
    generateResponseCallback(res)
  )
}

const deleteProductPriceHistory = (req, res) => {
  let productId = req.params.id
  let priceHistoryId = req.params.childId
  Service.deleteProductPriceHistory(
    productId,
    priceHistoryId,
    generateResponseCallback(res)
  )
}

const updateProductById = (req, res) => {
  let productId = req.params.id
  let update = req.body
  Service.updateProductById(productId, update, generateResponseCallback(res))
}

const deleteProductById = (req, res) => {
  let productId = req.params.id
  Service.deleteProductById(productId, generateResponseCallback(res))
}

export {
  createProduct,
  getProducts,
  getAllProducts,
  getProductById,
  addProductPriceHistory,
  deleteProductPriceHistory,
  updateProductById,
  deleteProductById
}
