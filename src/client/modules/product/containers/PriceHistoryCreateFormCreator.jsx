import { connect } from 'react-redux'
import { compose } from 'redux'
import { fromJS } from 'immutable'

import PriceHistoryCreateFormCreator from '../components/PriceHistoryCreateFormCreator'
import { createPriceHistoryRequest } from '../actions'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = state => {
  const loading = state.getIn(['product', 'status', 'formPHLoading'])
  return { loading }
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
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    immutPropsToJS,
    withNoDelayLoading
  )(PriceHistoryCreateFormCreator(productId))
