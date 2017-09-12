import { connect } from 'react-redux'

import CompanySelect from '../components/CompanySelect'
import { companyArraySelector } from '../selectors'
import { fetchCompanyListRequest } from '../actions'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const companies = companyArraySelector(
    state.getIn(['company', 'companyEntity']),
    state.getIn(['company', 'companyStatus', 'all'])
  )
  return {
    companies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCompanies: () => {
      dispatch(fetchCompanyListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(immutPropsToJS(CompanySelect))
