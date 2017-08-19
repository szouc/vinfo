import Header from '../components/Header'
import { connect } from 'react-redux'
import {
  userLogoutRequest
} from '../actions'

const mapStateToProps = (state) => {
  const {auth} = state
  if (auth.get('fullname')) {
    return { fullname: auth.get('fullname') }
  }
  return { fullname: null }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(userLogoutRequest())
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
