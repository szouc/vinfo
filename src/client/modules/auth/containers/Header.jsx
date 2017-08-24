import Header from '../components/Header'
import { connect } from 'react-redux'
import { logoutRequest } from '../actions'

const mapStateToProps = state => {
  const auth = state.get('auth')
  const username = auth.getIn(['user', 'username'])
  return { username: username }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => dispatch(logoutRequest())
  }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
