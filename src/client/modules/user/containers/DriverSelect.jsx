import { connect } from 'react-redux'

import UserSelect from '../components/UserSelect'
import { fetchUserAllRequest } from '../actions'

import { driverArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const users = driverArraySelector(state)
  return { users }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(fetchUserAllRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(UserSelect)
)
