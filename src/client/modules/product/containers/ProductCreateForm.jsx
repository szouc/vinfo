import { connect } from 'react-redux'

import ProductCreateForm from '../components/ProductCreateForm'
import { createProductRequest } from '../actions'

import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['product', 'productStatus', 'error'])
  return { errorMessage }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createProductRequest(values))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(immutPropsToJS(ProductCreateForm))
