import { connect } from 'react-redux'
import { compose } from 'redux'
import { fromJS } from 'immutable'

import ProductListTable from '../components/ProductListTable'
import {
  fetchProductListRequest,
  deleteProductRequest,
  deletePriceHistoryRequest
} from '../actions'
import { productArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = state => {
  const products = productArraySelector(state)
  const pagination = state.getIn(['product', 'pagination'])
  const loading = state.getIn(['product', 'status', 'listLoading'])
  return { products, pagination, loading }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: (pageNumber, pageSize, fromDate, toDate) => {
      dispatch(
        fetchProductListRequest({ pageNumber, pageSize, fromDate, toDate })
      )
    },
    deleteProductById: id => () => {
      dispatch(deleteProductRequest(id))
    },
    deletePriceHistoryById: (productId, priceHistoryId) => () => {
      dispatch(deletePriceHistoryRequest(fromJS({ productId, priceHistoryId })))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withDelayLoading
)(ProductListTable)
