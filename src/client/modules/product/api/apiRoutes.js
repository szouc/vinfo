import { product } from '@server/exports/api'
import addHostAddr from '@clientUtils/addHostAddr'

export const PRODUCT_ROOT_API = addHostAddr(product.PRODUCT_ROOT_API)
export const PRODUCT_ID_API = addHostAddr(product.PRODUCT_ID_API)
export const PRODUCT_PRICE_HISTORY_API = addHostAddr(product.PRODUCT_PRICE_HISTORY_API)
export const PRODUCT_PRICE_HISTORY_ID_API = addHostAddr(product.PRODUCT_PRICE_HISTORY_ID_API)
export const PRODUCT_QUESRY_API = addHostAddr(product.PRODUCT_QUERY_API)
