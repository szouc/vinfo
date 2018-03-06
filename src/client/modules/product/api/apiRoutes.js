import { product } from '@server/exports/api'
import addHostAddr from '@clientUtils/addHostAddr'

export const PRODUCT_ROOT = addHostAddr(product.PRODUCT_ROOT)
export const PRODUCT_ID = addHostAddr(product.PRODUCT_ID)
export const PRODUCT_PRICE_HISTORY = addHostAddr(product.PRODUCT_PRICE_HISTORY)
export const PRODUCT_PRICE_HISTORY_ID = addHostAddr(product.PRODUCT_PRICE_HISTORY_ID)
export const PRODUCT_QUERY = addHostAddr(product.PRODUCT_QUERY)
