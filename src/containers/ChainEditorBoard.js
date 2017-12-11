import {connect} from 'react-redux'
import {testBlockMoved} from '../actions'
import ChainEditorBoard from '../components/ChainEditorBoard'

function mapStateToProps(state) {
  return {
    chain: state.chain
  }
}

function mapDispatchToProps(dispatch) {
  return {
    testBlockMoved: (payload) => dispatch(testBlockMoved(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorBoard)
