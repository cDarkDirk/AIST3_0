import {
  TEST_BUILDER_TESTS_FETCH_SUCCEED,
  TEST_SELECTED,
  TEST_BUILDER_FORM_INPUT_CHANGED,
  ADD_NEW_TEST,
  RESET_MODIFICATION_MARKERS,
} from '../constants'

const initialState = {
  testBuilderTests: [],
  selectedTestIndex: null,
  testNamesForDropdown: [],
};

const testBuilder = (state = initialState, action) => {
  switch (action.type) {
    case TEST_BUILDER_TESTS_FETCH_SUCCEED: {
      const testNamesForDropdown = action.payload.map((test)=>{
        return test.test_name
      });
      const tests = [...action.payload];
      const adaptedTests = tests.map((current) => {
        current.modified = false;
        current.new = false;
        return current;
      });
      return {
        ...state,
        testBuilderTests: adaptedTests,
        testNamesForDropdown: testNamesForDropdown,
      }
    }
    case TEST_SELECTED: {
      return {
        ...state,
        selectedTestIndex: action.payload,
      }
    }
    case ADD_NEW_TEST: {
      const testBuilderTests = [...state.testBuilderTests];
      const newTestEntry = {
        "test_id": 'Enter test id number here...',
        "test_name": "Brand new test",
        "job_trigger":
        {
          "uri": "Enter Jenkins URL here...",
          "login": "Enter Jenkins URL here...",
          "params": {},
          "job_name": "Enter job name here...",
          "passOrToken": "Job pass or token..."
        },
        "tag_names": [],
        'new': true
      };
      testBuilderTests.push(newTestEntry);
      const testNamesForDropdown = testBuilderTests.map(test => test.test_name);
      return{
        ...state,
        testBuilderTests,
        testNamesForDropdown,
      }
    }
    case RESET_MODIFICATION_MARKERS: {
      const testBuilderTests = [...state.testBuilderTests];
      testBuilderTests[state.selectedTestIndex].modified = false;
      testBuilderTests[state.selectedTestIndex].new = false;
      const testNamesForDropdown = testBuilderTests.map(test => test.test_name);
      return {
        ...state,
        testBuilderTests,
        testNamesForDropdown,
      }
    }
    case TEST_BUILDER_FORM_INPUT_CHANGED: {
      const testBuilderTests = [...state.testBuilderTests];
      switch (action.payload.paramName) {
        case 'test_name': {
          testBuilderTests[state.selectedTestIndex].test_name = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          if(!newTest) testBuilderTests[state.selectedTestIndex].modified = true;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'test_id': {
          testBuilderTests[state.selectedTestIndex].test_id = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          if(!newTest) testBuilderTests[state.selectedTestIndex].modified = true;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'uri': {
          testBuilderTests[state.selectedTestIndex].job_trigger.uri = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          if(!newTest) testBuilderTests[state.selectedTestIndex].modified = true;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'login': {
          testBuilderTests[state.selectedTestIndex].job_trigger.login = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          if(!newTest) testBuilderTests[state.selectedTestIndex].modified = true;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'job_name': {
          testBuilderTests[state.selectedTestIndex].job_trigger.job_name = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          if(!newTest) testBuilderTests[state.selectedTestIndex].modified = true;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'passOrToken': {
          testBuilderTests[state.selectedTestIndex].job_trigger.passOrToken = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          if(!newTest) testBuilderTests[state.selectedTestIndex].modified = true;
          return {
            ...state,
            testBuilderTests
          }
        }
        case 'tag_names': {
          testBuilderTests[state.selectedTestIndex].tag_names = action.payload.paramValue.map((parVal)=>parVal.value);
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          if(!newTest) testBuilderTests[state.selectedTestIndex].modified = true;
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
