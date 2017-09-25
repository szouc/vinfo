import { connect } from 'react-redux'

import DriverSelect from '../components/DriverSelect'
import { fetchUserListRequest } from '../actions'

import { driverArraySelector } from '../selectors'
import immutPropsToJS from '@clientModulesShared/immutPropsToJS'

const mapStateToProps = state => {
  const errorMessage = state.getIn(['user', 'userStatus', 'error'])
  const drivers = driverArraySelector(state)
  return { errorMessage, drivers }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(fetchUserListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(DriverSelect)
)
