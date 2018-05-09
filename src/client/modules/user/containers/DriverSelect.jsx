import { connect } from 'react-redux'

import UserSelect from '../components/UserSelect'
import { fetchDriverRequest } from '../actions'

import { driverArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const users = driverArraySelector(state)
  return { users }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: (page, size, from, to, role = 'driver') => {
      dispatch(fetchDriverRequest({ page, size, from, to, role }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(UserSelect)
)
