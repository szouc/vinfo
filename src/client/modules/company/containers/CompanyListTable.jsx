import { connect } from 'react-redux'

import CompanyListTable from '../components/CompanyListTable'
import { deleteCompanyRequest, fetchCompanyListRequest } from '../actions'
import { companyArraySelector } from '../selectors'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const companies = companyArraySelector(
    state.getIn(['company', 'companyEntity']),
    state.getIn(['company', 'companyStatus', 'all'])
  )
  return { companies }
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

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(CompanyListTable)
)
