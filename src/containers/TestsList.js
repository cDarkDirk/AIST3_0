import {connect} from 'react-redux'
import {fetchTests} from '../api'
import TestsList from '../components/TestsList'
import {testBlockClicked} from '../actions'

function mapStateToProps(state) {
    return {
        tests: state.test,
        selectedChainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {
            tests: []
        },
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTests: () => dispatch(fetchTests()),
        testBlockClicked: (test) => dispatch(testBlockClicked(test))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)
