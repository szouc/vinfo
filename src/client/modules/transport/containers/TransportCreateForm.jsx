import { connect } from 'react-redux'
import { compose } from 'redux'

import TransportCreateForm from '../components/TransportCreateForm'
import { createTransportRequest } from '../actions'

import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.getIn(['transport', 'status', 'formLoading']),
    users: state.getIn(['entities', 'users']),
    companies: state.getIn(['entities', 'companies']),
    products: state.getIn(['entities', 'products']),
    vehicles: state.getIn(['entities', 'vehicles'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: state => values => {
      const createValues = values.merge(state)
      dispatch(createTransportRequest(createValues))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withNoDelayLoading
)(TransportCreateForm)
