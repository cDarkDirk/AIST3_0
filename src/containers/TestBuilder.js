import {connect} from 'react-redux'
import TestBuilderPage from '../components/TestBuilder'
import {
  testBuilderDataFetch,
  submitTest,
} from "../api"

import {
  testSelected,
  testBuilderFormInputChanged,
  newTestAdded,
} from "../actions"

function mapStateToProps(state) {
  return {
    testBuilderTests: state.testBuilder.testBuilderTests,
    notifications: state.notifications,
    selectedTestIndex: state.testBuilder.selectedTestIndex,
    testNamesForDropdown: state.testBuilder.testNamesForDropdown,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTests: () => dispatch(testBuilderDataFetch()),
    setSelectedTestIndex: (index) => dispatch(testSelected(index)),
    testBuilderFormInputChanged: (newValue) => dispatch(testBuilderFormInputChanged(newValue)),
    addNewTest: () => dispatch(newTestAdded()),
    submitCurrentTest: (testObject) => dispatch(submitTest(testObject)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestBuilderPage)
