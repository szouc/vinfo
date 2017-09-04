import { connect } from 'react-redux'

import CompanyCreateForm from '../components/CompanyCreateForm'
import { createCompanyRequest } from '../actions'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['company', 'companyStatus', 'error'])
  return { errorMessage }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      dispatch(createCompanyRequest(values))
    }
  }
}

const CompanyCreateFormContainer = connect(mapStateToProps, mapDispatchToProps)(CompanyCreateForm)

export default CompanyCreateFormContainer