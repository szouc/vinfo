import { connect } from 'react-redux'
import { updateProductRequest } from '../actions'
import { fromJS } from 'immutable'

import ProductUpdateFormCreator from '../components/ProductUpdateFormCreator'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = (state, ownProps) => {
  const errorMessage = state.getIn(['product', 'productStatus', 'error'])
  const initialValues = {
    name: ownProps.product.name,
    specs: ownProps.product.specs,
    pricing: ownProps.product.pricing
  }

  return { errorMessage, initialValues }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        updateProductRequest(
          fromJS({ productId: ownProps.product._id, values })
        )
      )
    }
  }
}

export default productId =>
  connect(mapStateToProps, mapDispatchToProps)(
    immutPropsToJS(ProductUpdateFormCreator(productId))
  )
