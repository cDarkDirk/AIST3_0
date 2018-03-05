import {connect} from 'react-redux'

import HomePage from '../components/HomePage'

function mapStateToProps(state) {
  return{
    notifications: state.notifications,
    owner: state.dataAuthorization.paramNames.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
