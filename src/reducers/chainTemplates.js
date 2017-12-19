import {
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    CHAIN_EDITOR_TEMPLATE_FETCH_FAIL
} from '../constants'

const initialState = null

const chainTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED: {
            return action.payload
        }

        default:
            return state
    }
}

export default chainTemplateReducer
