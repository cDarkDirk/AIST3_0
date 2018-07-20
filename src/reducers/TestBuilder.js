import {
  TEST_BUILDER_TESTS_FETCH_SUCCEED,
  TEST_SELECTED,
  TEST_BUILDER_FORM_INPUT_CHANGED,
  ADD_NEW_TEST,
  RESET_MODIFICATION_MARKERS,
  TEST_BUILDER_AS_FETCH_SUCCEED,
  TEST_AS_SELECTED,
  TEST_BUILDER_STANDS_FETCH_SUCCEED,
  DUPLICATE_CURRENT_TEST,
  TEST_STANDS_INPUT_CHANGE,
  CLEAR_TEST_FILTER,
  FILTERED_TEST_BY_TAGS_FETCH_SUCCEED,
  APPLY_TESTS_FILTERS,
} from '../constants'

const initialState = {
  testBuilderTests: [],
  selectedTestIndex: null,
  testNamesForDropdown: [],
  systems: [],
  stands: [],
  testsOrigin: [],
  testNamesOrigin: [],
};

const MODULE_MAIN = '#/testbuilder/';

const testBuilder = (state = initialState, action) => {
  switch (action.type) {
    case TEST_BUILDER_TESTS_FETCH_SUCCEED: {
      const testNamesForDropdown = action.payload.map((test) => {
        return {
          test_name: test.test_name,
          test_id: test.test_id,
        }
      });
      const tests = [...action.payload];
      const adaptedTests = tests.map((current) => {
        current.modified = false;
        current.new = false;
        if (!current.tag_names.static) {
          current.tag_names.static = [];
        } else {
          let tmp = [...current.tag_names.static];
          current.tag_names.static = tmp.map((tag, index) => {
            return {label: tag, value: index}
          });
        }
        if (!current.tag_names.dynamic) {
          current.tag_names.dynamic = [];
        } else {
          let tmp = [...current.tag_names.dynamic];
          current.tag_names.dynamic = tmp.map((tag, index) => {
            return {label: tag, value: index}
          });
        }
        if (!current.a_system) {
          current.a_system = '';
        }
        if (current.stands.length > 0) {
          current.stands = current.stands.map((s, index) => {
            return {label: s, value: index}
          });
        }
        //TODO: убрать после доработки бэка
        if (current.job_trigger.login) {
          current.job_trigger.password = current.job_trigger.passOrToken;
          current.job_trigger.token = '';
        } else {
          current.job_trigger.token = current.job_trigger.passOrToken;
          current.job_trigger.password = '';
          current.job_trigger.login = '';
        }
        return current;
      });
      return {
        ...state,
        testBuilderTests: adaptedTests,
        testNamesForDropdown: testNamesForDropdown,
        selectedTestIndex: null,
        testsOrigin: adaptedTests,
        testNamesOrigin: testNamesForDropdown,
      }
    }

    case TEST_BUILDER_AS_FETCH_SUCCEED: {
      return {
        ...state,
        systems: action.as,
      }
    }

    case TEST_SELECTED: {
      window.location.hash = MODULE_MAIN + (state.testBuilderTests[action.payload].test_name === ''
        ? state.testNamesForDropdown[action.payload].test_name
        : state.testBuilderTests[action.payload].test_name);
      return {
        ...state,
        selectedTestIndex: action.payload,
      }
    }
    case ADD_NEW_TEST: {
      let nameCounter = 0;
      let newTestName = {};
      let testNamesForDropdown = [...state.testNamesForDropdown];
      const newTestEntry = {
        "test_name": "",
        "job_trigger":
          {
            "uri": "",
            "login": "",
            "params": {},
            "jobName": "",
            "job_url": "",
            "password": "",
            "token": "",
            "passOrToken": ""
          },
        "tag_names": {"static": [], "dynamic": []},
        "a_system": '',
        'new': true,
        'modified': false
      };
      testNamesForDropdown.map(test => {
        if (test.test_name.indexOf('newTest') >= 0) {
          nameCounter++;
        }
        return test;
      });
      if (nameCounter > 0) {
        newTestName = {
          test_name: "newTest" + nameCounter.toString(),
        };
      } else {
        newTestName = {
          test_name: "newTest",
        };
      }
      testNamesForDropdown = [
        newTestName,
        ...state.testNamesForDropdown,
      ];
      window.location.hash = MODULE_MAIN + newTestName.test_name;
      return {
        ...state,
        selectedTestIndex: 0,
        testBuilderTests: [newTestEntry, ...state.testBuilderTests],
        testsOrigin: [newTestEntry, ...state.testsOrigin],
        testNamesOrigin: [newTestName, ...state.testNamesOrigin],
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
        case 'job_trigger': {
          testBuilderTests[state.selectedTestIndex].job_trigger[action.payload.paramValue.key] = action.payload.paramValue.value;
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

    case TEST_AS_SELECTED: {
      let testBuilderTests = [...state.testBuilderTests];
      testBuilderTests[state.selectedTestIndex].a_system = state.systems[action.index].code;
      const newTest = testBuilderTests[state.selectedTestIndex].new;
      testBuilderTests[state.selectedTestIndex].modified = !newTest;
      return {
        ...state,
        testBuilderTests,
      }
    }

    case TEST_BUILDER_STANDS_FETCH_SUCCEED: {
      const stands = action.stands.map((stand, index) => {
        return {label: stand.code, value: index}
      });
      return {
        ...state,
        stands,
      }
    }

    case DUPLICATE_CURRENT_TEST: {
      const dupTest = {...state.testBuilderTests[state.selectedTestIndex]};
      const oldTests = [...state.testBuilderTests];
      dupTest.test_name += 'Clone';
      dupTest.new = true;
      dupTest.modified = false;
      let nameCounter = 0;
      oldTests.map(template => {
        if (template.test_name.indexOf(dupTest.test_name) >= 0) {
          nameCounter++;
        }
      });
      if (nameCounter > 0) {
        dupTest.test_name += nameCounter.toString();
      }
      const testNamesForDropdown = [{test_name: dupTest.test_name}, ...state.testNamesForDropdown];
      const testBuilderTests = [dupTest, ...state.testBuilderTests];
      const testsOrigin = [dupTest, ...state.testsOrigin];
      const testNamesOrigin = [{test_name: dupTest.test_name}, ...state.testNamesOrigin];
      window.location.hash = MODULE_MAIN + (testBuilderTests[0].test_name === ''
        ? testNamesForDropdown[0].test_name
        : testBuilderTests[0].test_name);
      let selectedTestIndex = 0;
      return {
        ...state,
        testBuilderTests,
        testNamesForDropdown,
        selectedTestIndex,
        testsOrigin,
        testNamesOrigin,
      }
    }

    case TEST_STANDS_INPUT_CHANGE: {
      const testBuilderTests = [...state.testBuilderTests];
      testBuilderTests[state.selectedTestIndex].stands = action.stands;
      testBuilderTests[state.selectedTestIndex].modified = !testBuilderTests[state.selectedTestIndex].new;
      return {
        ...state,
        testBuilderTests,
      }
    }

    case CLEAR_TEST_FILTER: {
      const testBuilderTests = [...state.testsOrigin];
      const testNamesForDropdown = [...state.testNamesOrigin];
      return {
        ...state,
        testBuilderTests,
        testNamesForDropdown,
      }
    }

    case FILTERED_TEST_BY_TAGS_FETCH_SUCCEED: {
      const tests = [...action.tests];
      const adaptedTests = tests.map((current) => {
        current.modified = false;
        current.new = false;
        if (!current.tag_names.static) {
          current.tag_names.static = [];
        } else {
          let tmp = [...current.tag_names.static];
          current.tag_names.static = tmp.map((tag, index) => {
            return {label: tag, value: index}
          });
        }
        if (!current.tag_names.dynamic) {
          current.tag_names.dynamic = [];
        } else {
          let tmp = [...current.tag_names.dynamic];
          current.tag_names.dynamic = tmp.map((tag, index) => {
            return {label: tag, value: index}
          });
        }
        if (!current.a_system) {
          current.a_system = '';
        }
        if (current.stands.length > 0) {
          current.stands = current.stands.map((s, index) => {
            return {label: s, value: index}
          });
        }
        return current;
      });
      const origin = [...adaptedTests];
      const filters = action.filters;
      let filtersAllied = [];

      if (filters.systems !== null && filters.stands !== null) {
        origin.map(t => {
          let sys = false;
          let stand = false;
          if (t.a_system === filters.systems.label) {
            sys = true;
          }
          if (t.stands.length > 0) {
            t.stands.map(s => {
              if (s.label === filters.stands.label) stand = true;
            });
          }
          if (sys && stand) filtersAllied.push(t);
        });
      } else {
        if (filters.systems !== null) {
          origin.map(t => {
            if (t.a_system === filters.systems.label) {
              filtersAllied.push(t);
            }
          });
        } else {
          if (filters.stands !== null) {
            origin.map(t => {
              if (t.stands.length > 0)
                t.stands.map(s => {
                  if (s.label === filters.stands.label) filtersAllied.push(t);
                });
            });
          } else {
            filtersAllied = origin;
          }
        }

      }

      let testBuilderTests = filtersAllied;

      const testNamesForDropdown = testBuilderTests.map((test) => {
        return {
          test_name: test.test_name,
          test_id: test.test_id,
        }
      });

      window.location.hash = MODULE_MAIN;
      return {
        ...state,
        testBuilderTests,
        testNamesForDropdown,
        selectedTestIndex: null,
      }
    }

    case APPLY_TESTS_FILTERS: {
      const origin = [...state.testsOrigin];
      const filters = action.filters;
      let filtersAllied = [];

      if (filters.systems !== null && filters.stands !== null) {
        origin.map(t => {
          let sys = false;
          let stand = false;
          if (t.a_system === filters.systems.label) {
            sys = true;
          }
          if (t.stands.length > 0) {
            t.stands.map(s => {
              if (s.label === filters.stands.label) stand = true;
            });
          }
          if (sys && stand) filtersAllied.push(t);
        });
      } else {
        if (filters.systems !== null) {
          origin.map(t => {
            if (t.a_system === filters.systems.label) {
              filtersAllied.push(t);
            }
          });
        } else {
          if (filters.stands !== null) {
            origin.map(t => {
              if (t.stands.length > 0)
                t.stands.map(s => {
                  if (s.label === filters.stands.label) filtersAllied.push(t);
                });
            });
          } else {
            filtersAllied = origin;
          }
        }

      }
      let testBuilderTests = filtersAllied;
      const testNamesForDropdown = testBuilderTests.map((test) => {
        return {
          test_name: test.test_name,
          test_id: test.test_id,
        }
      });

      return {
        ...state,
        testBuilderTests,
        testNamesForDropdown,
        selectedTestIndex: null,
      }
    }

    default:
      return {
        ...state,
      }
  }
};
export default testBuilder
