import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import ProductListTable from '../components/ProductListTable'
import {
  fetchProductListRequest,
  deleteProductRequest,
  deletePriceHistoryRequest
} from '../actions'
import { productArraySelector } from '../selectors'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const products = productArraySelector(state)
  return { products }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(fetchProductListRequest())
    },
    deleteProductById: id => () => {
      dispatch(deleteProductRequest(id))
    },
    deletePriceHistoryById: (productId, priceHistoryId) => () => {
      dispatch(deletePriceHistoryRequest(fromJS({ productId, priceHistoryId })))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(ProductListTable)
)
