import { connect } from 'react-redux'
import { compose } from 'redux'

import ProductCreateForm from '../components/ProductCreateForm'
import { createProductRequest } from '../actions'

import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = state => {
  const loading = state.getIn(['product', 'status', 'formLoading'])
  return { loading }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createProductRequest(values))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withNoDelayLoading
)(ProductCreateForm)
