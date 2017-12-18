import {
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    CHAIN_EDITOR_TEMPLATE_FETCH_FAIL,
    CHAIN_SELECTED
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
        default:
            return state
    }
}

export default chainTemplateReducer
