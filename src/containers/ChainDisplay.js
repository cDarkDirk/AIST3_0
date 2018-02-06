import {connect} from 'react-redux'
import {closeButtonClicked, testBlockMoved} from '../actions'
import ChainDisplay from '../components/ChainDisplay'

function mapStateToProps(state, ownProps) {

  const test = state.test || [];
  console.log(state);
  return {
    tests: ownProps.chainTemplate.tests.map(ct => test.find(test => test.test_id === ct.id))
  }
}

function mapDispatchToProps(dispatch) {
    return {
        testBlockMoved: (payload) => dispatch(testBlockMoved(payload)),
        closeButtonClicked: (payload) => dispatch(closeButtonClicked(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainDisplay)
