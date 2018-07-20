import {connect} from 'react-redux'
import BrowserAlert from '../components/BrowserAlert'
import {error} from "react-notification-system-redux";

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAlert: (notification) => dispatch(error(notification)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowserAlert)
