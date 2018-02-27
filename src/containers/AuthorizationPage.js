import {connect} from 'react-redux'
import AuthorizationPage from '../components/AuthorizationPage'
import {loginPasswordChange} from "../actions";
import {getPublicKey} from "../api";

function mapStateToProps(state) {
  return {
    paramNames: state.dataAuthorization.paramNames,
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginButtonClicked : (payload) => dispatch(getPublicKey(payload)),
    loginPasswordChange : (payload) => dispatch(loginPasswordChange(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage)
