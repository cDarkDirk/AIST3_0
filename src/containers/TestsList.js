import {connect} from 'react-redux'
import {
  fetchTests, filterEntityByTags, getDictionaryData, submitTest, testBuilderDataFetch,
  testListDataFetch
} from '../api'
import TestsList from '../components/TestsList'
import {
  applyTestsFilters,
  clearTestFilter,
  filteredTestByTagsFetchSucceedChainEditor,
  testBlockClicked,
  testBuilderStandsFetchSucceed,
  testListAsFetchSucceed,
  testListASSelected,
  testListSelected,
} from '../actions'
import test from "../reducers/test";

function mapStateToProps(state) {
    return {
        tests: state.test,
        selectedChainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {
            tests: []
        },
      selectedChainTemplateIndex : state.chainTemplates.selectedChainTemplate,
      testBuilderTests: state.testList.testBuilderTests,
      notifications: state.notifications,
      selectedTestIndex: state.testList.selectedTestIndex,
      testNamesForDropdown: state.testList.testNamesForDropdown,
      testName: state.testList.testName,
      owner: state.dataAuthorization.paramNames.name,
      systems: state.testList.systems,
      stands: state.testList.stands,
    }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchTests: () => dispatch(fetchTests()),
      testBlockClicked: (test) => dispatch(testBlockClicked(test)),
      getTests: () => dispatch(testListDataFetch()),
      setSelectedTestIndex: (index) => dispatch(testListSelected(index)),
      submitCurrentTest: (testObject) => dispatch(submitTest(testObject)),
      getAS: () => dispatch(getDictionaryData('systems', testListAsFetchSucceed)),
      getStands: () => dispatch(getDictionaryData('stands', testBuilderStandsFetchSucceed)),
      sysIndexChanged: (index) => dispatch(testListASSelected(index)),
      filterTestsByTags: (tags, filters) => dispatch(filterEntityByTags(tags, 'tests', filteredTestByTagsFetchSucceedChainEditor, filters)),
      clearTestFilter: () => dispatch(clearTestFilter()),
      applyTestsFilters: (filters) => dispatch(applyTestsFilters(filters)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)
