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
  DUPLICATE_CURENT_CHAIN,
} from '../constants'

const initialState = {
  chainTemplates: [],
  selectedChainTemplate: 0,
  chainNames: [],
  owner:'',
};

const chainTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED: {
      const chainTemplates = action.payload.map((chain) => {
        chain.modified = false;
        chain.new = false;
        return chain;
      });
      const chainNames = action.payload.map((chain) => chain.name);
      return {
        ...state,
        chainTemplates,
        chainNames,
      }
    }

    case CHAIN_SELECTED: {
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
        ]
      }
    }

    case TEST_BLOCK_CLICKED: {
      const selectedTemplateIndex = state.selectedChainTemplate;
      const allChainTemplates = [...state.chainTemplates];
      const modified = !state.chainTemplates[selectedTemplateIndex].new;
      allChainTemplates[selectedTemplateIndex] = {
        ...allChainTemplates[selectedTemplateIndex],
        tests: [...allChainTemplates[selectedTemplateIndex].tests,
          {
            id: action.payload.test_id
          }],
        modified,
      };
      return {
        ...state,
        chainTemplates: allChainTemplates
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
          owner: action.payload,
          new: true,
        },
        ...state.chainTemplates];
      const chainNames = chainTemplates.map(chain => chain.name);
      return {
        ...state,
        selectedChainTemplate: 0,
        chainTemplates,
        chainNames,
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

    case DUPLICATE_CURENT_CHAIN: {
      let oldChainTemplates = [...state.chainTemplates];
      const newOne = {...oldChainTemplates[state.selectedChainTemplate]};
      newOne.modified = false;
      newOne.new = true;
      const chainTemplates = [
        newOne,
          ...oldChainTemplates,
      ];
      const chainNames = chainTemplates.map(chain => chain.name);
      return {
        ...state,
        chainTemplates,
        chainNames,
      }
    }

    default:
      return state
  }
};

export default chainTemplateReducer
