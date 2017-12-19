import {connect} from 'react-redux'
import {testBlockMoved} from '../actions'
import ChainDisplay from '../components/ChainDisplay'

function mapStateToProps(state) {
  const chainTemplate = state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {tests: []}

  return {
    chainTemplate: chainTemplate,
    tests: chainTemplate.tests.map(ct => state.test.find(test => test.test_id == ct.id))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    testBlockMoved: (payload) => dispatch(testBlockMoved(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainDisplay)
