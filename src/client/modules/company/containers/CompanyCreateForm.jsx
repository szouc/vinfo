import { connect } from 'react-redux'

import { CompanyCreateForm } from '../components'
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreateForm)
