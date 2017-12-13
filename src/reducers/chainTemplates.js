import {
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCSEED,
    CHAIN_EDITOR_TEMPLATE_FETCH_FAIL
} from '../constants'

const initialState = null

const chainTemplatesTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAIN_EDITOR_TEMPLATE_FETCH_SUCSEED: {
            return action.payload
        }

        default:
            return state
    }
}

export default chainTemplatesTemplateReducer
