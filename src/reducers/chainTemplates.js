import {
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    TEST_BLOCK_CLICKED,
    CHAIN_SELECTED,
    TEST_BLOCK_MOVED,
    CHAIN_TEMPLATE_NAME_CHANGED,
    CHAIN_TEMPLATE_DELETED,
    CHAIN_TEMPLATE_ADDED,
    CLOSE_BUTTON_CLICKED
} from '../constants'

const initialState = {
    chainTemplates: [],
    selectedChainTemplate: 0
}

const chainTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED: {
            return {
                ...state,
                chainTemplates: action.payload
            }
        }
        case CHAIN_SELECTED: {
            return {
                ...state,
                selectedChainTemplate: action.selectedChain
            }
        }
        case TEST_BLOCK_MOVED: {
            const {oldIndex, newIndex} = action.payload
            const sel = state.selectedChainTemplate
            let tests = [...state.chainTemplates[sel].tests]
            tests.splice(newIndex, 0, tests.splice(oldIndex, 1)[0]);
            return {
                ...state,
                chainTemplates: [
                    ...state.chainTemplates.slice(0, sel),
                    {...state.chainTemplates[sel], tests},
                    ...state.chainTemplates.slice(sel + 1, state.chainTemplates.length)
                ]
            }
        }
        case TEST_BLOCK_CLICKED: {
            const selectedTemplateIndex = state.selectedChainTemplate;
            const allChainTemplates = [...state.chainTemplates];
            allChainTemplates[selectedTemplateIndex].tests.push({
                id: action.payload.test_id
            });
            return {
                ...state,
                chainTemplates: allChainTemplates
            }
        }
        case CLOSE_BUTTON_CLICKED: {
            const selectedTemplateIndex = state.selectedChainTemplate;
            const chainTemplates = [...state.chainTemplates]
            const tests = [...state.chainTemplates[selectedTemplateIndex].tests]
            tests.splice(action.payload,1)
            chainTemplates[selectedTemplateIndex].tests = tests
            return {
                ...state,
                chainTemplates
            }
        }

        case CHAIN_TEMPLATE_NAME_CHANGED: {
          const sel = state.selectedChainTemplate
          const chainTemplates = [...state.chainTemplates]
          chainTemplates[sel] = {
            ...chainTemplates[sel],
            name: action.payload
          }
          return {
            ...state,
            chainTemplates
          }
        }

        case CHAIN_TEMPLATE_DELETED: {
          return {
            ...state,
            selectedChainTemplate: 0,
            chainTemplates: state.chainTemplates.filter(t => t.name !== action.payload.name)
          }
        }

        case CHAIN_TEMPLATE_ADDED: {
          return {
            ...state,
            selectedChainTemplate: state.chainTemplates.length,
            chainTemplates: [...state.chainTemplates, {name: 'New Template', tests: []}]
          }
        }
        default:
            return state
    }
}

export default chainTemplateReducer
