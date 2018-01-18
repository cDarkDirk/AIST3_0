import {connect} from 'react-redux'
import TestBuilderPage from '../components/TestBuilder'
import {testBuilderDataFetch} from "../api";
import {testSelected,testBuilderFormInputChanged} from "../actions";

function mapStateToProps(state) {
  return {
    testBuilderTests: state.testBuilder.testBuilderTests,
    notifications: state.notifications,
    selectedTestIndex: state.testBuilder.selectedTestIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTests: () => dispatch(testBuilderDataFetch()),
    setSelectedTestIndex: (index) => dispatch(testSelected(index)),
    testBuilderFormInputChanged: (newValue) => dispatch(testBuilderFormInputChanged(newValue)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestBuilderPage)
