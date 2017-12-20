import {
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    TEST_BLOCK_CLICKED,
    CHAIN_SELECTED,
    TEST_BLOCK_MOVED,
    CLOSE_BUTTON_CLICKED
} from '../constants'

const initialState = {
    chainTemplates: [],
    selectedChainTemplate: 0
}

const chainTemplateReducer = (state = initialState, action) => {
    console.log(state)
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
            const allChainTemplates = [...state.chainTemplates];
            allChainTemplates[selectedTemplateIndex].tests.splice(action.payload,1);
            return {
                ...state,
                chainTemplates: allChainTemplates
            }
        }
        default:
            return state
    }
}

export default chainTemplateReducer
