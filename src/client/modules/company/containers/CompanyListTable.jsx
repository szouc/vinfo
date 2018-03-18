import { connect } from 'react-redux'
import { compose } from 'redux'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withDelayLoading } from '@clientUtils/withLoading'

import CompanyListTable from '../components/CompanyListTable'
import { deleteCompanyRequest, fetchCompanyListRequest } from '../actions'
import { companyArraySelector } from '../selectors'

const mapStateToProps = state => {
  const companies = companyArraySelector(state)
  const pagination = state.getIn(['company', 'pagination'])
  const loading = state.getIn(['company', 'status', 'listLoading'])
  return { companies, pagination, loading }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCompanyById: id => {
      dispatch(deleteCompanyRequest(id))
    },
    getCompanies: (pageNumber, pageSize, fromDate, toDate) => {
      dispatch(
        fetchCompanyListRequest({ pageNumber, pageSize, fromDate, toDate })
      )
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withDelayLoading
)(CompanyListTable)
