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
      const filterValue = values.update('priceHistory', value =>
        value.filter(
          item => item.get('start') && item.get('end') && item.get('price')
        )
      )
      // const filterPH = values
      //   .get('priceHistory')
      //   .filter(
      //     item => item.get('start') && item.get('end') && item.get('price')
      //   )
      // const filterValue = values.set('priceHistory', filterPH)
      dispatch(
        createPriceHistoryRequest(
          fromJS({
            productId: ownProps.product._id,
            values: filterValue
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
