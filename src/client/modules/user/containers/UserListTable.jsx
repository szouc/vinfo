import { connect } from 'react-redux'
import { compose } from 'redux'

import UserListTable from '../components/UserListTable'
import { fetchUserListRequest, deleteUserRequest } from '../actions'

import { userArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'
import { withDelayLoading } from '@clientUtils/withLoading'

const mapStateToProps = state => {
  const users = userArraySelector(state)
  const pagination = state.getIn(['user', 'pagination'])
  const loading = state.getIn(['user', 'status', 'listLoading'])
  return { users, pagination, loading }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: (page, size, from, to, role) => {
      dispatch(fetchUserListRequest({ page, size, from, to, role }))
    },
    deleteUserByUsername: username => () => {
      dispatch(deleteUserRequest(username))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutPropsToJS,
  withDelayLoading
)(UserListTable)
