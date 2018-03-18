import { connect } from 'react-redux'

import UserSelect from '../components/UserSelect'
import { fetchUserListRequest } from '../actions'

import { driverArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const users = driverArraySelector(state)
  return { users }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(fetchUserListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(UserSelect)
)
