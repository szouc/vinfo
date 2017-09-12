import { connect } from 'react-redux'

import ProductSelect from '../components/ProductSelect'
import { productArraySelector } from '../selectors'
import { fetchProductListRequest } from '../actions'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const products = productArraySelector(
    state.getIn(['product', 'productEntity']),
    state.getIn(['product', 'productStatus', 'all'])
  )
  return {
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(fetchProductListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(immutPropsToJS(ProductSelect))
