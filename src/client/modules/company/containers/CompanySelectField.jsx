import { connect } from 'react-redux'

import { CompanySelectField } from '../components'

import { fetchCompanyListRequest } from '../actions'

const mapStateToProps = state => {
  return {
    nameOptions: state.getIn(['company', 'companyEntity'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCompanies: () => {
      dispatch(fetchCompanyListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySelectField)
