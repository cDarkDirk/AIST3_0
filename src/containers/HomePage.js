import {connect} from 'react-redux'

import HomePage from '../components/HomePage'
import {clearFields} from "../actions";

function mapStateToProps(state) {
  return{
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
