import {connect} from 'react-redux'
import TestBuilderPage from '../components/TestBuilder'
import {
  testBuilderDataFetch,
  submitTest,
  getDictionaryData,
  filterEntityByTags,
} from "../api"

import {
  testSelected,
  testBuilderFormInputChanged,
  newTestAdded,
  testBuilderAsFetchSucceed,
  testASSelected,
  testBuilderStandsFetchSucceed,
  duplicateCurrentTest,
  testStandsInputChange,
  testBuilderTestsFetchSucceed,
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
    stands: state.testBuilder.stands,
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
    getStands: () => dispatch(getDictionaryData('stands', testBuilderStandsFetchSucceed)),
    sysIndexChanged: (index) => dispatch(testASSelected(index)),
    duplicateCurrentTest: () => dispatch(duplicateCurrentTest()),
    testStandsInputChange: (stands) => dispatch(testStandsInputChange(stands)),
    filterTestsByTags: (tags) => dispatch(filterEntityByTags(tags, 'tests', testBuilderTestsFetchSucceed)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestBuilderPage)
