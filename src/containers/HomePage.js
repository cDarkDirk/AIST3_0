import {connect} from 'react-redux'

import HomePage from '../components/HomePage'

function mapStateToProps(state) {
  return {
    counter: state.ui.counter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
