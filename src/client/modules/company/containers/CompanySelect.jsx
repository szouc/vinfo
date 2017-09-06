import { connect } from 'react-redux'

import CompanySelect from '../components/CompanySelect'

import { fetchCompanyListRequest } from '../actions'

const mapStateToProps = state => {
  const companyEntity = state.getIn(['company', 'companyEntity'])
  return {
    companyEntity
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCompanies: () => {
      dispatch(fetchCompanyListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySelect)
