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
  owner:'',
  groups:[],
  chainMarkers: [],
  dataTemplatesNames: [],
  allChainTemplates: [],
  chainNamesForDropdown : [],
};

const chainTemplateReducer = (state = initialState, action) => {
  switch (action.type) {

    case ALL_CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED:{
      const chainTemplates = action.payload.map((chain) => {
        chain.modified = false;
        chain.new = false;
        if (chain.templates) chain['templates'] = chain.templates.map(name => {
          return{label: name, value: name};
        });
        if (chain.groups) chain['groups'] = chain.groups.map((name, index) => {
          return{label: name, value: index};
        });
        return chain;
      });
      const allChainTemplates = chainTemplates;
      let chainNames = action.payload.map((chain) => chain.name);
      let chainMarkersFind = [];
      action.payload.map((chain) => {if (chainMarkersFind.indexOf(chain.marker)  === -1){
        chainMarkersFind.push(chain.marker);
        return chain.marker;
      }});
      let chainNamesForDropdown = action.payload.map((chain) => chain.name);
      return {
        ...state,
        groups: chainTemplates.groups,
        chainTemplates,
        chainNames,
        chainNamesForDropdown,
        chainMarkers : chainMarkersFind,
        allChainTemplates,
      }
    }

    case FILTERED_CHAIN_BY_TAGS_FETCH_SUCCEED:{
      let filtersAllied = [];
      const filters = action.filters;
      let chainTemplates = [...action.chain_templates];
      let chainNamesForDropdown = chainTemplates.map((chain) => chain.name);
      if (filters.marker !== null) {
        chainTemplates.map(t => {
          if (t.marker === filters.marker.label) {
            filtersAllied.push(t);
          }
        });
       chainNamesForDropdown = filtersAllied.map((chain) => chain.name);
      }
      if (filtersAllied = []){
        filtersAllied = [...action.chain_templates];
      }

      return {
        ...state,
        chainTemplates: filtersAllied,
        chainNamesForDropdown,
      }
    }

    case CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED: {

      const chainTemplates = action.payload.map((chain) => {
        chain.modified = false;
        chain.new = false;
        if (chain.templates) chain['templates'] = chain.templates.map(name => {
          return{label: name, value: name};
        });
        if (chain.groups) chain['groups'] = chain.groups.map((name, index) => {
          return{label: name, value: index};
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
      const chainTemplates = state.allChainTemplates;
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
      const chainTemplates = state.allChainTemplates;
      const chainNames = chainTemplates.map((chain)=> chain.name);
      const chainNamesForDropdown = chainTemplates.map((chain) => chain.name);
      window.location.hash = '#/chaineditor/';
      return{
        ...state,
        chainTemplates,
        chainNames,
        chainNamesForDropdown,
      }
    }

    case CHAIN_SELECTED: {
      window.location.hash = '#/chaineditor/'+state.chainTemplates[action.selectedChain].name;

      return {
        ...state,
        selectedChainTemplate: action.selectedChain
      }
    }

    case TEST_BLOCK_MOVED: {
      const {oldIndex, newIndex} = action.payload;
      const sel = state.selectedChainTemplate;
      let tests = [...state.chainTemplates[sel].tests];
      tests.splice(newIndex, 0, tests.splice(oldIndex, 1)[0]);
      const modified = !state.chainTemplates[sel].new;
      return {
        ...state,
        chainTemplates: [
          ...state.chainTemplates.slice(0, sel),
          {...state.chainTemplates[sel], tests, modified},
          ...state.chainTemplates.slice(sel + 1, state.chainTemplates.length)
        ],
      }
    }

    case TEST_BLOCK_CLICKED: {
      const selectedTemplateIndex = state.selectedChainTemplate;
      const allChainTemplates = [...state.chainTemplates];
      const modified = !state.chainTemplates[selectedTemplateIndex].new;
      allChainTemplates[selectedTemplateIndex] = {
        ...allChainTemplates[selectedTemplateIndex],
        tests: [...allChainTemplates[selectedTemplateIndex].tests,
          action.payload.test_id],
        modified,
      };
      return {
        ...state,
        chainTemplates: allChainTemplates,
      }
    }

    case CLOSE_BUTTON_CLICKED: {
      const selectedTemplateIndex = state.selectedChainTemplate;
      const chainTemplates = [...state.chainTemplates];
      const tests = [...state.chainTemplates[selectedTemplateIndex].tests];
      const modified = !state.chainTemplates[selectedTemplateIndex].new;
      tests.splice(action.payload, 1);
      chainTemplates[selectedTemplateIndex] = {
        ...chainTemplates[selectedTemplateIndex],
        tests: tests,
        modified,
      };
      return {
        ...state,
        chainTemplates,
      }
    }

    case CHAIN_TEMPLATE_NAME_CHANGED: {
      const sel = state.selectedChainTemplate;
      const chainTemplates = [...state.chainTemplates];
      const modified = !state.chainTemplates[sel].new;
      chainTemplates[sel] = {
        ...chainTemplates[sel],
        name: action.payload,
        modified,
      };
      return {
        ...state,
        chainTemplates,
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
      const chainTemplates = [
        {
          name: 'New Template',
          tests: [],
          fields: [],
          marker: '',
          modified: false,
          templates: [],
          owner: action.payload,
          new: true,
        },
        ...state.chainTemplates];
      const chainNames = chainTemplates.map(chain => chain.name);
      const chainNamesForDropdown = chainNames;
      return {
        ...state,
        selectedChainTemplate: 0,
        chainTemplates,
        chainNames,
        chainNamesForDropdown,
      }
    }

    case SUBMIT_CHAIN_TEMPLATE_SUCCEED: {
      const chainTemplates = [...state.chainTemplates];
      chainTemplates[state.selectedChainTemplate].modified = false;
      chainTemplates[state.selectedChainTemplate].new = false;
      const chainNames = chainTemplates.map(chain => chain.name);
      const chainNamesForDropdown = chainNames;
      return {
        ...state,
        chainTemplates,
        chainNames,
        chainNamesForDropdown,
      }
    }

    case CHAIN_TEMPLATE_MARKER_CHANGED: {
      const sel = state.selectedChainTemplate;
      const chainTemplates = [...state.chainTemplates];
      const modified = !state.chainTemplates[sel].new;
      chainTemplates[sel] = {
        ...chainTemplates[sel],
        marker: action.payload,
        modified,
      };
      return {
        ...state,
        chainTemplates,
      }
    }

    case DUPLICATE_CURRENT_CHAIN: {
      let oldChainTemplates = [...state.chainTemplates];
      const newOne = {...oldChainTemplates[state.selectedChainTemplate]};
      newOne.modified = false;
      newOne.new = true;
      newOne.name += 'Clone';
      const chainTemplates = [
        newOne,
          ...oldChainTemplates,
      ];
      const chainNames = chainTemplates.map(chain => chain.name);
      const chainNamesForDropdown = chainNames;
      return {
        ...state,
        chainTemplates,
        chainNames,
        chainNamesForDropdown,
      }
    }

    case DATA_TEMPLATE_ADDED: {
      const chainTemplates = [...state.chainTemplates];
      chainTemplates[state.selectedChainTemplate]['templates'] = action.payload;
      chainTemplates[state.selectedChainTemplate].modified = !chainTemplates[state.selectedChainTemplate].new;
      return {
        ...state,
        chainTemplates,
      }
    }

    case GROUP_ADDED: {
      const chainTemplates = [...state.chainTemplates];
      chainTemplates[state.selectedChainTemplate]['groups'] = action.payload;
      chainTemplates[state.selectedChainTemplate].modified = !chainTemplates[state.selectedChainTemplate].new;
      return {
        ...state,
        chainTemplates,
      }
    }

    default:
      return state
  }
};

export default chainTemplateReducer
