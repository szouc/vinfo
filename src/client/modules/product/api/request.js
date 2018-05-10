import axios from '@clientSettings/axiosInstance'
import { product as URL } from '@server/exports/api'
import { replaceAll } from '@clientUtils/replaceAll'

const createProduct = payload => {
  const config = {
    url: URL.PRODUCT_ROOT,
    method: 'post',
    data: payload
  }
  return axios(config)
}

const getAllProducts = () => {
  const config = {
    url: URL.PRODUCT_ALL,
    method: 'get'
  }
  return axios(config)
}

const getProductsWithPg = payload => {
  const config = {
    url: URL.PRODUCT_ROOT,
    method: 'get',
    params: payload
  }
  return axios(config)
}

const deleteProductById = id => {
  const config = {
    url: URL.PRODUCT_ID.replace(/:id/, id),
    method: 'delete'
  }
  return axios(config)
}

const updateProductById = (productId, update) => {
  const config = {
    url: URL.PRODUCT_ID.replace(/:id/, productId),
    method: 'put',
    data: update
  }
  return axios(config)
}

const createPriceHistory = (productId, priceHistory) => {
  const config = {
    url: URL.PRODUCT_PRICE_HISTORY.replace(/:id/, productId),
    method: 'post',
    data: priceHistory
  }
  return axios(config)
}

const deletePriceHistoryById = (productId, priceHistoryId) => {
  const mapObj = {
    ':id': productId,
    ':childId': priceHistoryId
  }
  const config = {
    url: replaceAll(URL.PRODUCT_PRICE_HISTORY_ID, mapObj),
    method: 'delete'
  }
  return axios(config)
}

export {
  createProduct,
  getAllProducts,
  getProductsWithPg,
  createPriceHistory,
  updateProductById,
  deleteProductById,
  deletePriceHistoryById
}
