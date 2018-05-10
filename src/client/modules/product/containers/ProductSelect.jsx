import { connect } from 'react-redux'

import { compose } from 'redux'
import { withDelayLoading } from '@clientUtils/withLoading'
import ProductSelect from '../components/ProductSelect'
import { productSelectSelector } from '../selectors'
import { fetchSelectRequest } from '../actions'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const products = productSelectSelector(state)
  const pagination = state.getIn(['product', 'pagination'])
  const loading = state.getIn(['product', 'status', 'selectLoading'])
  return {
    loading,
    pagination,
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: (page, size, from, to) => {
      dispatch(fetchSelectRequest({ page, size, from, to }))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withDelayLoading
)(ProductSelect)
