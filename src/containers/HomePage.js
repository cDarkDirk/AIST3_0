import {connect} from 'react-redux'
import {addCounter} from '../actions'
import { push } from 'connected-react-router'

import HomePage from '../components/HomePage'

function mapStateToProps(state) {
  return {
    counter: state.ui.counter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCounter: () => dispatch(addCounter()),
    goToChainEditor: () => dispatch(push('/chaineditor'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
