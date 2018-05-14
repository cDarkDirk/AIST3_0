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
  TEST_LIST_TESTS_FETCH_SUCCEED,
} from '../constants'

const initialState = {
  testBuilderTests: [],
  selectedTestIndex: null,
  testNamesForDropdown: [],
  systems: [],
  stands: [],
  testsOrigin: [],
};

const MODULE_MAIN = '#/chaineditor/';

const testList = (state = initialState, action) => {
  switch (action.type) {
    case TEST_LIST_TESTS_FETCH_SUCCEED: {
      console.log("БЫЛ ТУТ!")
      const testNamesForDropdownTwo = action.payload.map((test) => {
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
        return current;
      });
      return {
        ...state,
        testBuilderTests: adaptedTests,
        testNamesForDropdownTwo: testNamesForDropdownTwo,
        selectedTestIndex: null,
        testsOrigin: adaptedTests,
      }
    }

    case TEST_BUILDER_AS_FETCH_SUCCEED: {
      return {
        ...state,
        systems: action.as,
      }
    }

    case TEST_SELECTED: {
      window.location.hash = MODULE_MAIN + state.testBuilderTests[action.payload].test_name;
      return {
        ...state,
        selectedTestIndex: action.payload,
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

    case CLEAR_TEST_FILTER: {
      const testBuilderTests = [...state.testsOrigin];
      const testNamesForDropdownTwo = [...state.testsOrigin].map((test) => {
        return {
          test_name: test.test_name,
          test_id: test.test_id,
        }
      });
      return {
        ...state,
        testBuilderTests,
        testNamesForDropdownTwo,
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

      const testNamesForDropdownTwo = testBuilderTests.map((test) => {
        return {
          test_name: test.test_name,
          test_id: test.test_id,
        }
      });

      window.location.hash = MODULE_MAIN;
      return {
        ...state,
        testBuilderTests,
        testNamesForDropdownTwo,
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
      const testNamesForDropdownTwo = testBuilderTests.map((test) => {
        return {
          test_name: test.test_name,
          test_id: test.test_id,
        }
      });

      return {
        ...state,
        testBuilderTests,
        testNamesForDropdownTwo,
        selectedTestIndex: null,
      }
    }

    default:
      return {
        ...state,
      }
  }
};
export default testList
