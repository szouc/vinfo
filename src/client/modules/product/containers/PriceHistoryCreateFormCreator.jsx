import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import PriceHistoryCreateFormCreator from '../components/PriceHistoryCreateFormCreator'
import { createPriceHistoryRequest } from '../actions'

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
            productId: ownProps.product.get('_id'),
            values
          })
        )
      )
    }
  }
}

export default productId =>
  connect(mapStateToProps, mapDispatchToProps)(
    PriceHistoryCreateFormCreator(productId)
  )
