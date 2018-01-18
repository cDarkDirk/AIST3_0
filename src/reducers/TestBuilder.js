import {
  TEST_BUILDER_TESTS_FETCH_SUCCEED,
  TEST_SELECTED,
  TEST_BUILDER_FORM_INPUT_CHANGED,
} from '../constants'

const initialState = {
  testBuilderTests: [],
  selectedTestIndex: null,
};

const testBuilder = (state = initialState, action) => {
  switch (action.type) {
    case TEST_BUILDER_TESTS_FETCH_SUCCEED: {
      return {
        ...state,
        testBuilderTests: action.payload,
      }
    }
    case TEST_SELECTED: {
      return {
        ...state,
        selectedTestIndex: action.payload,
      }
    }
    case TEST_BUILDER_FORM_INPUT_CHANGED: {
      const testBuilderTests = [...state.testBuilderTests];
      switch (action.payload.paramName) {
        case 'test_name': {
          testBuilderTests[state.selectedTestIndex].test_name = action.payload.paramValue;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'test_id': {
          testBuilderTests[state.selectedTestIndex].test_id = action.payload.paramValue;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'uri': {
          testBuilderTests[state.selectedTestIndex].job_trigger.uri = action.payload.paramValue;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'login': {
          testBuilderTests[state.selectedTestIndex].job_trigger.login = action.payload.paramValue;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'job_name': {
          testBuilderTests[state.selectedTestIndex].job_trigger.job_name = action.payload.paramValue;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'passOrToken': {
          testBuilderTests[state.selectedTestIndex].job_trigger.passOrToken = action.payload.paramValue;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'tag_names': {
          const newItems = action.payload.paramValue.map((value)=>value.value);
          testBuilderTests[state.selectedTestIndex].tag_names = newItems;
          return {
            ...state,
            testBuilderTests,
          }
        }
        default: {
          return {
            ...state,
          }
        }
      }
    }
    default:
      return {
        ...state,
      }
  }
};
export default testBuilder
