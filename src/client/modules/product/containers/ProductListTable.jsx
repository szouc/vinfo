import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import ProductListTable from '../components/ProductListTable'
import {
  fetchProductListRequest,
  deleteProductRequest,
  deletePriceHistoryRequest
} from '../actions'
import { productArraySelector } from '../selectors'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['product', 'productStatus', 'error'])
  const products = productArraySelector(
    state.getIn(['product', 'productEntity']),
    state.getIn(['product', 'productStatus', 'all'])
  )
  return { errorMessage, products }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(fetchProductListRequest())
    },
    deleteProductById: id => {
      dispatch(deleteProductRequest(id))
    },
    deletePriceHistoryById: (productId, priceHistoryId) => {
      dispatch(deletePriceHistoryRequest(fromJS({ productId, priceHistoryId })))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListTable)
