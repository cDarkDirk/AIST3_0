import {
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    CHAIN_EDITOR_TEMPLATE_FETCH_FAIL,
    CHAIN_SELECTED,
    TEST_BLOCK_MOVED
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
                ...state.chainTemplates.slice(0,sel),
                {...state.chainTemplates[sel], tests},
                ...state.chainTemplates.slice(sel+1, state.chainTemplates.length)
              ]
            }
        }

        default:
            return state
    }
}

export default chainTemplateReducer
