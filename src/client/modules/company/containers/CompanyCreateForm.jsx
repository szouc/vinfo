import { connect } from 'react-redux'
import { compose } from 'redux'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withNoDelayLoading } from '@clientUtils/withLoading'

import CompanyCreateForm from '../components/CompanyCreateForm'
import { createCompanyRequest } from '../actions'

const mapStateToProps = state => {
  return {
    loading: state.getIn(['company', 'status', 'formLoading'])
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createCompanyRequest(values))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withNoDelayLoading
)(CompanyCreateForm)
