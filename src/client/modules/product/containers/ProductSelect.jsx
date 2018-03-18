import { connect } from 'react-redux'

import ProductSelect from '../components/ProductSelect'
import { productArraySelector } from '../selectors'
import { fetchProductAllRequest } from '../actions'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const products = productArraySelector(state)
  return {
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(fetchProductAllRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(immutPropsToJS(ProductSelect))
