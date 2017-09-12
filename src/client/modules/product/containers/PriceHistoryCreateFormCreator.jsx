import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import PriceHistoryCreateFormCreator from '../components/PriceHistoryCreateFormCreator'
import { createPriceHistoryRequest } from '../actions'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['product', 'productStatus', 'error'])
  return { errorMessage }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        createPriceHistoryRequest(
          fromJS({
            productId: ownProps.product._id,
            values
          })
        )
      )
    }
  }
}

export default productId =>
  connect(mapStateToProps, mapDispatchToProps)(
    immutPropsToJS(PriceHistoryCreateFormCreator(productId))
  )
