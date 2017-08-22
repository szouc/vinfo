import Header from '../components/Header'
import { connect } from 'react-redux'
import {
  logoutRequest
} from '../actions'

const mapStateToProps = (state) => {
  const {auth} = state
  const user = auth.get('user')
  if (user.username) {
    return { username: user.username }
  }
  return { username: null }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(logoutRequest())
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
