import { connect } from 'react-redux'

import { compose } from 'redux'
import { withDelayLoading } from '@clientUtils/withLoading'
import CompanySelect from '../components/CompanySelect'
import { companySelectSelector } from '../selectors'
import { fetchSelectRequest } from '../actions'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const companies = companySelectSelector(state)
  const pagination = state.getIn(['company', 'pagination'])
  const loading = state.getIn(['company', 'status', 'selectLoading'])
  return {
    loading,
    pagination,
    companies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCompanies: (page, size, from, to) => {
      dispatch(fetchSelectRequest({ page, size, from, to }))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withDelayLoading
)(CompanySelect)
