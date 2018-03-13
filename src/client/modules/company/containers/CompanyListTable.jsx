import { connect } from 'react-redux'

import CompanyListTable from '../components/CompanyListTable'
import { deleteCompanyRequest, fetchCompanyListRequest } from '../actions'
import { companyArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const companies = companyArraySelector(
    state.get('entities'),
    state.getIn(['company', 'status', 'all'])
  )
  const pagination = state.getIn(['company', 'pagination'])
  return { companies, pagination }
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

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(CompanyListTable)
)
