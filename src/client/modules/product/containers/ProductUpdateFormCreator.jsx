import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateProductRequest } from '../actions'
import { fromJS } from 'immutable'

import ProductUpdateFormCreator from '../components/ProductUpdateFormCreator'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = (state, ownProps) => {
  const loading = state.getIn(['product', 'status', 'formUpdateLoading'])
  const initialValues = {
    name: ownProps.product.name,
    specs: ownProps.product.specs,
    pricing: ownProps.product.pricing
  }

  return { loading, initialValues }
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
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    immutPropsToJS,
    withNoDelayLoading
  )(ProductUpdateFormCreator(productId))
