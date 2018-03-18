import { connect } from 'react-redux'

import CompanySelect from '../components/CompanySelect'
import { companyArraySelector } from '../selectors'
import { fetchCompanyAllRequest } from '../actions'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const companies = companyArraySelector(state)
  return {
    companies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCompanies: () => {
      dispatch(fetchCompanyAllRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(CompanySelect)
)
