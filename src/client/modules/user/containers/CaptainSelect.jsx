import { connect } from 'react-redux'

import UserSelect from '../components/UserSelect'
import { fetchCaptainRequest } from '../actions'

import { captainArraySelector } from '../selectors'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const users = captainArraySelector(state)
  return { users }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: (page, size, from, to, role = 'captain') => {
      dispatch(fetchCaptainRequest({ page, size, from, to, role }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  immutPropsToJS(UserSelect)
)
