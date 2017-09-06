import { connect } from 'react-redux'

import CompanyListTable from '../components/CompanyListTable'
import { deleteCompanyRequest, fetchCompanyListRequest } from '../actions'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['company', 'companyStatus', 'error'])
  const companies = state.getIn(['company', 'companyEntity'])
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
