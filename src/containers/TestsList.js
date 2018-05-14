import {connect} from 'react-redux'
import {
  fetchTests, filterEntityByTags, getDictionaryData, submitTest, testBuilderDataFetch,
  testListDataFetch
} from '../api'
import TestsList from '../components/TestsList'
import {
  applyTestsFilters,
  clearTestFilter, duplicateCurrentTest, filteredTestByTagsFetchSucceed, newTestAdded, testASSelected, testBlockClicked,
  testBuilderAsFetchSucceed, testBuilderFormInputChanged,
  testBuilderStandsFetchSucceed,
  testSelected, testStandsInputChange
} from '../actions'
import test from "../reducers/test";

function mapStateToProps(state) {
    return {
        tests: state.test,
        selectedChainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {
            tests: []
        },
      testBuilderTests: state.testList.testBuilderTests,
      notifications: state.notifications,
      selectedTestIndex: state.testList.selectedTestIndex,
      testNamesForDropdownTwo: state.testList.testNamesForDropdownTwo,
      // testNamesForDropdown: state.test,
      testName: state.testList.testName,
      owner: state.dataAuthorization.paramNames.name,
      systems: state.testList.systems,
      stands: state.testList.stands,
    }
}

function mapDispatchToProps(dispatch) {
    return {
      // getTests: () => dispatch(testBuilderDataFetch()),
      fetchTests: () => dispatch(fetchTests()),
      testBlockClicked: (test) => dispatch(testBlockClicked(test)),
      getTests: () => dispatch(testListDataFetch()),
      setSelectedTestIndex: (index) => dispatch(testSelected(index)),
      submitCurrentTest: (testObject) => dispatch(submitTest(testObject)),
      getAS: () => dispatch(getDictionaryData('systems', testBuilderAsFetchSucceed)),
      getStands: () => dispatch(getDictionaryData('stands', testBuilderStandsFetchSucceed)),
      sysIndexChanged: (index) => dispatch(testASSelected(index)),
      filterTestsByTags: (tags, filters) => dispatch(filterEntityByTags(tags, 'tests', filteredTestByTagsFetchSucceed, filters)),
      clearTestFilter: () => dispatch(clearTestFilter()),
      applyTestsFilters: (filters) => dispatch(applyTestsFilters(filters)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)
