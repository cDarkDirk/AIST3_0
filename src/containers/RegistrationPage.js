import {connect} from 'react-redux'

import RegistrationPage from '../components/RegistrationPage'

function mapStateToProps(state) {
  return {
    counter: state.ui.counter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
