import {connect} from 'react-redux'

import TDME2E from '../components/TDME2E'

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

export default connect(mapStateToProps, mapDispatchToProps)(TDME2E)
