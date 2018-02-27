import {connect} from 'react-redux'
import RegistrationPage from '../components/RegistrationPage'
import {getPublicKeyRegistration} from "../api";
import {loginPasswordChange} from "../actions";

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ReqistrationButtonClick : (payload) => dispatch(getPublicKeyRegistration(payload)),
    loginPasswordChange : (payload) => dispatch(loginPasswordChange(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
