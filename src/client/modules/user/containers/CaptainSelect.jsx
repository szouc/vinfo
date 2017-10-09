import { connect } from 'react-redux'

import UserSelect from '../components/UserSelect'
import { fetchUserListRequest } from '../actions'

import { captainArraySelector } from '../selectors'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const users = captainArraySelector(state)
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
