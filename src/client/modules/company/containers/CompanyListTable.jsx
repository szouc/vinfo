import { connect } from 'react-redux'

import CompanyListTable from '../components/CompanyListTable'
import { deleteCompanyRequest, fetchCompanyListRequest } from '../actions'
import { companyArraySelector } from '../selectors'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['company', 'companyStatus', 'error'])
  const companies = companyArraySelector(
    state.getIn(['company', 'companyEntity']),
    state.getIn(['company', 'companyStatus', 'all'])
  )
  return { errorMessage, companies }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCompanyById: id => {
      dispatch(deleteCompanyRequest(id))
    },
    getAllCompanies: () => {
      dispatch(fetchCompanyListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListTable)
