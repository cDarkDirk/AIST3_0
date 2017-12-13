import {connect} from 'react-redux'
import {addCounter} from '../actions'

import HomePage from '../components/HomePage'

function mapStateToProps(state) {
  return {
    counter: state.ui.counter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCounter: () => dispatch(addCounter()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
