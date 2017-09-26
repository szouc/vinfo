import { connect } from 'react-redux'

import UserListTable from '../components/UserListTable'
import { fetchUserListRequest, deleteUserRequest } from '../actions'

import { userArraySelector } from '../selectors'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const users = userArraySelector(state)
  return { users }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(fetchUserListRequest())
    },
    deleteUserByUsername: username => () => {
      dispatch(deleteUserRequest(username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(UserListTable)
)
