import Header from '../components/Header'
import { connect } from 'react-redux'
import { logoutRequest } from '../actions'

const mapStateToProps = state => {
  const user = state.getIn(['auth', 'user'])
  return { user }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => dispatch(logoutRequest())
  }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
