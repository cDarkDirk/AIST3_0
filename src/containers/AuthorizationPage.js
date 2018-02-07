import {connect} from 'react-redux'
import AuthorizationPage from '../components/AuthorizationPage'
import {loginPasswordChange} from "../actions";
import {updateLoginForm} from "../api";

function mapStateToProps(state) {
  return {
    counter: state.ui.counter,
    paramNames: state.dataAuthorization.paramNames,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginButtonClicked : (payload) => dispatch(updateLoginForm(payload)),
    loginPasswordChange : (payload) => dispatch(loginPasswordChange(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage)
