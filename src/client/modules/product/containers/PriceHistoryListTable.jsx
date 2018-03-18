import { connect } from 'react-redux'
import { compose } from 'redux'

import PriceHistoryListTable from '../components/PriceHistoryListTable'

import { makePHSelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withDelayLoading } from '@clientUtils/withLoading'

const makeMapStateToProps = () => {
  const priceHistorySelector = makePHSelector()
  const mapStateToProps = (state, ownProps) => {
    return {
      priceHistories: priceHistorySelector(state, ownProps),
      loading: state.getIn(['product', 'status', 'listPHLoading'])
    }
  }
  return mapStateToProps
}

export default compose(
  connect(makeMapStateToProps),
  immutPropsToJS,
  withDelayLoading
)(PriceHistoryListTable)
