import { connect } from 'react-redux'

import UserSelect from '../components/UserSelect'
import { fetchUserAllRequest } from '../actions'

import { captainArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const users = captainArraySelector(state)
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
