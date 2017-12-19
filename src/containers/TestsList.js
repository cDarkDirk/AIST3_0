import {connect} from 'react-redux'
import {fetchTests} from '../api'
import TestsList from '../components/TestsList'

function mapStateToProps(state) {
    return {
        tests: state.test
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTests: () => dispatch(fetchTests())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)
