import {
  TEST_BUILDER_TESTS_FETCH_SUCCEED,
  TEST_SELECTED,
  TEST_BUILDER_FORM_INPUT_CHANGED,
  ADD_NEW_TEST,
  RESET_MODIFICATION_MARKERS,
  TEST_BUILDER_AS_FETCH_SUCCEED,
  TEST_AS_SELECTED,
} from '../constants'

const initialState = {
  testBuilderTests: [],
  selectedTestIndex: null,
  testNamesForDropdown: [],
  systems: [],
};

const testBuilder = (state = initialState, action) => {
  switch (action.type) {
    case TEST_BUILDER_TESTS_FETCH_SUCCEED: {
      const testNamesForDropdown = action.payload.map((test)=>{
        return {
          test_name: test.test_name,
          test_id: test.test_id,
        }
      });
      const tests = [...action.payload];
      const adaptedTests = tests.map((current) => {
        current.modified = false;
        current.new = false;
        if (!current.tag_names.static){
          current.tag_names.static = [];
        } else {
          let tmp = [...current.tag_names.static];
          current.tag_names.static = tmp.map((tag,index) => {return {label: tag, value: index}});
        }
        if (!current.tag_names.dynamic){
          current.tag_names.dynamic = [];
        } else {
          let tmp = [...current.tag_names.dynamic];
          current.tag_names.dynamic = tmp.map((tag,index) => {return {label: tag, value: index}});
        }
        if (!current.asystem){
          current.asystem = '';
        }
        return current;
      });
      return {
        ...state,
        testBuilderTests: adaptedTests,
        testNamesForDropdown: testNamesForDropdown,
      }
    }

    case TEST_BUILDER_AS_FETCH_SUCCEED: {
      return {
        ...state,
        systems: action.as,
      }
    }

    case TEST_SELECTED: {
      return {
        ...state,
        selectedTestIndex: action.payload,
      }
    }
    case ADD_NEW_TEST: {
      const newTestEntry = {
        "test_name": "Brand new test",
        "job_trigger":
        {
          "uri": "Enter Jenkins URL here...",
          "login": "Enter Jenkins URL here...",
          "params": {},
          "jobName": "Enter job name here...",
          "passOrToken": "Job pass or token..."
        },
        "tag_names": {"static": [], "dynamic": []},
        "asystem": '',
        'new': true,
        'modified': false
      };
      const testNamesForDropdown = [{
        test_name: newTestEntry.test_name,
        test_id: newTestEntry.test_id,
      },
        ...state.testNamesForDropdown,
      ];
      return{
        ...state,
        selectedTestIndex: 0,
        testBuilderTests: [newTestEntry,...state.testBuilderTests],
        testNamesForDropdown,
      }
    }
    case RESET_MODIFICATION_MARKERS: {
      const testBuilderTests = [...state.testBuilderTests];
      testBuilderTests[state.selectedTestIndex].modified = false;
      testBuilderTests[state.selectedTestIndex].new = false;
      const testNamesForDropdown = testBuilderTests.map(test => ({
        test_name: test.test_name,
        test_id: test.test_id,
      }));
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
          testBuilderTests[state.selectedTestIndex].modified = !newTest;
          return {
            ...state,
            testBuilderTests,
          }
        }
        case 'uri': {
          testBuilderTests[state.selectedTestIndex].job_trigger['uri'] = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          testBuilderTests[state.selectedTestIndex].modified = !newTest;
          return {
            ...state,
            testBuilderTests,
          }
        }
        case 'login': {
          testBuilderTests[state.selectedTestIndex].job_trigger['login'] = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          testBuilderTests[state.selectedTestIndex].modified = !newTest;
          return {
            ...state,
            testBuilderTests,
          }
        }
        case 'job_name': {
          testBuilderTests[state.selectedTestIndex].job_trigger['jobName'] = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          testBuilderTests[state.selectedTestIndex].modified = !newTest;
          return {
            ...state,
            testBuilderTests,
          }
        }
        case 'passOrToken': {
          testBuilderTests[state.selectedTestIndex].job_trigger['passOrToken']= action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          testBuilderTests[state.selectedTestIndex].modified = !newTest;
          return {
            ...state,
            testBuilderTests,
          }
        }
        case 'tag_names': {
          testBuilderTests[state.selectedTestIndex].tag_names = action.payload.paramValue;
          const newTest = testBuilderTests[state.selectedTestIndex].new;
          testBuilderTests[state.selectedTestIndex].modified = !newTest;
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

    case TEST_AS_SELECTED:{
      let testBuilderTests = [...state.testBuilderTests];
      testBuilderTests[state.selectedTestIndex].asystem = state.systems[action.index].code;
      const newTest = testBuilderTests[state.selectedTestIndex].new;
      testBuilderTests[state.selectedTestIndex].modified = !newTest;
      console.log('testBuilderTests --->', testBuilderTests);
      return {
        ...state,
        testBuilderTests,
      }
    }

    default:
      return {
        ...state,
      }
  }
};
export default testBuilder
