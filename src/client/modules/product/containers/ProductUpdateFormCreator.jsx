import { connect } from 'react-redux'
import { updateProductRequest } from '../actions'

import ProductUpdateFormCreator from '../components/ProductUpdateFormCreator'

const mapStateToProps = (state, ownProps) => {
  const errorMessage = state.getIn(['product', 'productStatus', 'error'])
  const initialValues = {
    name: ownProps.product.get('name'),
    specs: ownProps.product.get('specs'),
    pricing: ownProps.product.get('pricing')
  }

  return { errorMessage, initialValues }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        updateProductRequest({ productId: ownProps.product.get('_id'), values })
      )
    }
  }
}

export default productId =>
  connect(mapStateToProps, mapDispatchToProps)(
    ProductUpdateFormCreator(productId)
  )
