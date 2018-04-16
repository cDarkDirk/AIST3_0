import {connect} from 'react-redux'
import TestBuilderPage from '../components/TestBuilder'
import {
  testBuilderDataFetch,
  submitTest,
  getDictionaryData,
} from "../api"

import {
  testSelected,
  testBuilderFormInputChanged,
  newTestAdded,
  testBuilderAsFetchSucceed,
  testASSelected,
} from "../actions"

function mapStateToProps(state) {
  return {
    testBuilderTests: state.testBuilder.testBuilderTests,
    notifications: state.notifications,
    selectedTestIndex: state.testBuilder.selectedTestIndex,
    testNamesForDropdown: state.testBuilder.testNamesForDropdown,
    testName: state.testBuilder.testName,
    owner: state.dataAuthorization.paramNames.name,
    systems: state.testBuilder.systems,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTests: () => dispatch(testBuilderDataFetch()),
    setSelectedTestIndex: (index) => dispatch(testSelected(index)),
    testBuilderFormInputChanged: (newValue) => dispatch(testBuilderFormInputChanged(newValue)),
    addNewTest: () => dispatch(newTestAdded()),
    submitCurrentTest: (testObject) => dispatch(submitTest(testObject)),
    getAS: () => dispatch(getDictionaryData('systems', testBuilderAsFetchSucceed)),
    sysIndexChanged: (index) => dispatch(testASSelected(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestBuilderPage)
