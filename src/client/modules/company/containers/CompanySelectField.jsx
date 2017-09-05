import { connect } from 'react-redux'

import { CompanySelectField } from '../components'

const mapStateToProps = state => {
  return {
    options: state.getIn(['company', 'companyEntity'])
  }
}

export default connect(mapStateToProps, null)(CompanySelectField)
