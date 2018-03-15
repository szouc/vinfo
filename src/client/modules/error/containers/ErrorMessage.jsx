import { connect } from 'react-redux'
// import { clearErrorRequest } from '../actions'
import ErrorMessage from '../components/ErrorMessage'
import immutPropsToJS from '@clientUtils/immutPropsToJS'

const mapStateToProps = state => {
  const message = state.getIn(['error', 'message'])
  return { message }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     clearError: () => {
//       dispatch(clearErrorRequest())
//     }
//   }
// }

export default connect(mapStateToProps)(immutPropsToJS(ErrorMessage))
