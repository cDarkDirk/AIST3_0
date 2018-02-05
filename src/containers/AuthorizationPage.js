import {connect} from 'react-redux'

import AuthorizationPage from '../components/AuthorizationPage'

function mapStateToProps(state) {
  return {
    counter: state.ui.counter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage)
