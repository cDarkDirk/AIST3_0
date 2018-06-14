import {
  CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
  TEST_BLOCK_CLICKED,
  CHAIN_SELECTED,
  TEST_BLOCK_MOVED,
  CHAIN_TEMPLATE_NAME_CHANGED,
  CHAIN_TEMPLATE_DELETED,
  CHAIN_TEMPLATE_ADDED,
  CLOSE_BUTTON_CLICKED,
  SUBMIT_CHAIN_TEMPLATE_SUCCEED,
  CHAIN_TEMPLATE_MARKER_CHANGED,
  DUPLICATE_CURRENT_CHAIN,
  DATA_TEMPLATE_ADDED,
  GROUP_ADDED,
  APPLY_CHAINS_FILTERS,
  CLEAR_CHAIN_FILTER,
  ALL_CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
  FILTERED_CHAIN_BY_TAGS_FETCH_SUCCEED,
} from '../constants'

const initialState = {
  chainTemplates: [],
  selectedChainTemplate: null,
  chainNames: [],
  owner: '',
  groups: [],
  chainMarkers: [],
  dataTemplatesNames: [],
  allChainTemplates: [],
  chainNamesForDropdown: [],
  chainNamesForDropdownUnmodified: [],
};

const chainTemplateReducer = (state = initialState, action) => {
  switch (action.type) {

    case ALL_CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED: {
      const chainTemplates = action.payload.map((chain) => {
        chain.modified = false;
        chain.new = false;
        if (chain.templates) chain['templates'] = chain.templates.map(name => {
          return {label: name, value: name};
        });
        if (chain.groups) chain['groups'] = chain.groups.map((name, index) => {
          return {label: name, value: index};
        });
        chain.tests = chain.tests.filter( test => test !== '');
        return chain;
      });
      const allChainTemplates = [...chainTemplates];
      let chainNames = action.payload.map((chain) => chain.name);
      let chainMarkersFind = [];
      action.payload.map((chain) => {
        if (chainMarkersFind.indexOf(chain.marker) === -1) {
          chainMarkersFind.push(chain.marker);
        }
      });
      return {
        ...state,
        groups: chainTemplates.groups,
        chainTemplates,
        chainNames,
        chainNamesForDropdown: chainNames,
        chainNamesForDropdownUnmodified: chainNames,
        chainMarkers: chainMarkersFind,
        allChainTemplates,
      }
    }

    case FILTERED_CHAIN_BY_TAGS_FETCH_SUCCEED: {
      let chainTemplates = [];
      const filters = action.filters;
      let chainNamesForDropdown = [...action.chain_templates].map((chain) => chain.name);
      if (filters.marker !== null) {
        [...action.chain_templates].map(t => {
          if (t.marker === filters.marker.label) {
            chainTemplates.push(t);
          }
        });
        chainNamesForDropdown = chainTemplates.map((chain) => chain.name);
      }
      if (chainTemplates.length === 0) {
        chainTemplates = [...action.chain_templates];
      }

      return {
        ...state,
        chainTemplates,
        chainNamesForDropdown,
      }
    }

    case CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED: {

      const chainTemplates = action.payload.map((chain) => {
        chain.modified = false;
        chain.new = false;
        if (chain.templates) chain['templates'] = chain.templates.map(name => {
          return {label: name, value: name};
        });
        if (chain.groups) chain['groups'] = chain.groups.map((name, index) => {
          return {label: name, value: index};
        });
        return chain;
      });

      let chainNames = action.payload.map((chain) => chain.name);
      return {
        ...state,
        groups: chainTemplates.groups,
        chainTemplates,
        chainNames,
      }
    }

    case APPLY_CHAINS_FILTERS: {
      const filters = action.filters;
      const chainTemplates = [...state.allChainTemplates];
      let chainNamesForDropdown = state.chainNames;
      let filtersChainTemplates = [];
      chainTemplates.map(t => {
        if (t.marker === filters.marker.label) {
          filtersChainTemplates.push(t)
        }
      });
      chainNamesForDropdown = filtersChainTemplates.map((chain) => chain.name);
      return {
        ...state,
        chainNamesForDropdown,
        chainTemplates: filtersChainTemplates,
      }
    }

    case CLEAR_CHAIN_FILTER: {
      const chainTemplates = [...state.allChainTemplates];
      window.location.hash = '#/chaineditor/';
      return {
        ...state,
        chainTemplates,
        chainNamesForDropdown: state.chainNamesForDropdownUnmodified,
      }
    }

    case CHAIN_SELECTED: {
      window.location.hash = '#/chaineditor/' + state.chainTemplates[action.selectedChain].name;

      return {
        ...state,
        selectedChainTemplate: action.selectedChain
      }
    }

    case TEST_BLOCK_MOVED: {
      const {oldIndex, newIndex} = action.payload;
      const sel = state.selectedChainTemplate;
      let tests = [...state.chainTemplates[sel].tests];
      const chainIndex = state.allChainTemplates.findIndex(chainTemplate => {
        return state.chainTemplates[sel].name === chainTemplate.name
      });
      tests.splice(newIndex, 0, tests.splice(oldIndex, 1)[0]);
      const modified = !state.chainTemplates[sel].new;
      return {
        ...state,
        allChainTemplates: [
          ...state.allChainTemplates.slice(0, chainIndex),
          {...state.allChainTemplates[chainIndex], tests, modified},
          ...state.allChainTemplates.slice(chainIndex + 1, state.allChainTemplates.length)
        ],
        chainTemplates: [
          ...state.chainTemplates.slice(0, sel),
          {...state.chainTemplates[sel], tests, modified},
          ...state.chainTemplates.slice(sel + 1, state.chainTemplates.length)
        ],
      }
    }

    case TEST_BLOCK_CLICKED: {
      const selectedTemplateIndex = state.selectedChainTemplate;
      const chainTemplates = [...state.chainTemplates];
      const allChainTemplates = [...state.allChainTemplates];
      const chainIndex = allChainTemplates.findIndex(chainTemplate => {
        return chainTemplates[selectedTemplateIndex].name === chainTemplate.name
      });
      const modified = !state.chainTemplates[selectedTemplateIndex].new;
      let tests = [...chainTemplates[selectedTemplateIndex].tests];
      const newChain = Object.assign({},chainTemplates[selectedTemplateIndex]);
      tests.push(action.payload.test_id);
      newChain.tests = tests;
      newChain.modified = modified;
      chainTemplates[selectedTemplateIndex] = newChain;
      allChainTemplates[chainIndex] = newChain;
      return {
        ...state,
        chainTemplates,
        allChainTemplates,
      }
    }

    case CLOSE_BUTTON_CLICKED: {
      const selectedTemplateIndex = state.selectedChainTemplate;
      const chainTemplates = [...state.chainTemplates];
      const allChainTemplates = [...state.allChainTemplates];
      const chainIndex = allChainTemplates.findIndex(chainTemplate => {
        return chainTemplates[selectedTemplateIndex].name === chainTemplate.name
      });
      const tests = [...state.chainTemplates[selectedTemplateIndex].tests];
      const modified = !state.chainTemplates[selectedTemplateIndex].new;
      tests.splice(action.payload, 1);
      chainTemplates[selectedTemplateIndex] = {
        ...chainTemplates[selectedTemplateIndex],
        tests: tests,
        modified,
      };
      allChainTemplates[chainIndex] = {
        ...allChainTemplates[chainIndex],
        tests: tests,
        modified,
      };
      return {
        ...state,
        chainTemplates,
        allChainTemplates,
      }
    }

    case CHAIN_TEMPLATE_NAME_CHANGED: {
      const sel = state.selectedChainTemplate;
      const chainTemplates = [...state.chainTemplates];
      const allChainTemplates = [...state.allChainTemplates];
      const chainIndex = allChainTemplates.findIndex(chainTemplate => {
        return chainTemplates[sel].name === chainTemplate.name
      });
      const modified = !state.chainTemplates[sel].new;
      chainTemplates[sel] = {
        ...chainTemplates[sel],
        name: action.payload,
        modified,
      };
      allChainTemplates[chainIndex] = {
        ...allChainTemplates[chainIndex],
        name: action.payload,
        modified,
      };
      return {
        ...state,
        chainTemplates,
        allChainTemplates,
      }
    }

    case CHAIN_TEMPLATE_DELETED: {
      return {
        ...state,
        selectedChainTemplate: 0,
        chainTemplates: state.chainTemplates.filter(t => t.name !== action.payload.name),
      }
    }

    case CHAIN_TEMPLATE_ADDED: {
      const newTemplate = {
        name: Math.round(Math.random()*10000000000).toString(),
        tests: [],
        fields: [],
        groups: [],
        marker: '',
        modified: false,
        templates: [],
        owner: action.payload,
        new: true,
      };
      const chainTemplates = [
        newTemplate,
        ...state.chainTemplates];
      const chainNames = chainTemplates.map(chain => chain.name);
      const allChainTemplates = [newTemplate,...state.allChainTemplates];
      return {
        ...state,
        selectedChainTemplate: 0,
        chainTemplates,
        chainNames,
        chainNamesForDropdown: chainNames,
        chainNamesForDropdownUnmodified: [newTemplate.name,
          ...state.chainNamesForDropdownUnmodified],
        allChainTemplates,
      }
    }

    case SUBMIT_CHAIN_TEMPLATE_SUCCEED: {
      const chainTemplates = [...state.chainTemplates];
      chainTemplates[state.selectedChainTemplate].modified = false;
      chainTemplates[state.selectedChainTemplate].new = false;
      const chainNames = chainTemplates.map(chain => chain.name);
      return {
        ...state,
        chainTemplates,
        chainNames,
        chainNamesForDropdown: chainNames,
      }
    }

    case CHAIN_TEMPLATE_MARKER_CHANGED: {
      const sel = state.selectedChainTemplate;
      const chainTemplates = [...state.chainTemplates];
      const allChainTemplates = [...state.allChainTemplates];
      const chainIndex = allChainTemplates.findIndex(chainTemplate => {
        return chainTemplates[sel].name === chainTemplate.name
      });
      const modified = !state.chainTemplates[sel].new;

      chainTemplates[sel] = {
        ...chainTemplates[sel],
        marker: action.payload,
        modified,
      };

      allChainTemplates[chainIndex]= {
        ...allChainTemplates[chainIndex],
        marker: action.payload,
        modified,
      };

      return {
        ...state,
        chainTemplates,
        allChainTemplates,
      }
    }

    case DUPLICATE_CURRENT_CHAIN: {
      let oldChainTemplates = [...state.chainTemplates];
      const newOne = {...oldChainTemplates[state.selectedChainTemplate]};
      newOne.modified = false;
      newOne.new = true;
      newOne.name += 'Clone';
      let nameCounter = 0;
      oldChainTemplates.map( template => {
        if(template.name.indexOf(newOne.name) >= 0) {
          nameCounter++;
        }
      });
      if(nameCounter > 0){
        newOne.name += nameCounter.toString();
      }
      const chainTemplates = [
        newOne,
        ...oldChainTemplates,
      ];
      const allChainTemplates = [newOne, ...state.allChainTemplates];
      const chainNamesForDropdownUnmodified = [newOne.name, ...state.chainNamesForDropdownUnmodified];
      const chainNames = chainTemplates.map(chain => chain.name);
      return {
        ...state,
        chainTemplates,
        chainNames,
        chainNamesForDropdown: chainNames,
        allChainTemplates,
        chainNamesForDropdownUnmodified,
      }
    }

    case DATA_TEMPLATE_ADDED: {
      const chainTemplates = [...state.chainTemplates];
      const allChainTemplates = [...state.allChainTemplates];
      const chainIndex = allChainTemplates.findIndex(chainTemplate => {
        return chainTemplates[state.selectedChainTemplate].name === chainTemplate.name
      });
      chainTemplates[state.selectedChainTemplate]['templates'] = action.payload;
      chainTemplates[state.selectedChainTemplate].modified = !chainTemplates[state.selectedChainTemplate].new;
      allChainTemplates[chainIndex]['templates'] = action.payload;
      allChainTemplates[chainIndex].modified = !allChainTemplates[chainIndex].new;
      return {
        ...state,
        chainTemplates,
        allChainTemplates,
      }
    }

    case GROUP_ADDED: {
      const chainTemplates = [...state.chainTemplates];
      const allChainTemplates = [...state.allChainTemplates];
      const chainIndex = allChainTemplates.findIndex(chainTemplate => {
        return chainTemplates[state.selectedChainTemplate].name === chainTemplate.name
      });
      chainTemplates[state.selectedChainTemplate]['groups'] = action.payload;
      chainTemplates[state.selectedChainTemplate].modified = !chainTemplates[state.selectedChainTemplate].new;
      allChainTemplates[chainIndex]['groups'] = action.payload;
      allChainTemplates[chainIndex].modified = !allChainTemplates[chainIndex].new;
      return {
        ...state,
        chainTemplates,
        allChainTemplates,
      }
    }

    default:
      return state
  }
};

export default chainTemplateReducer
