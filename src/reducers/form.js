import {
    FORM_INPUT_CHANGE
} from '../constants'

const initialState = {}

const ui = (state = initialState, action) => {
    switch (action.type) {
        case FORM_INPUT_CHANGE: {
           return {
                ...state,
                [action.payload.formName]: {
                    ...state[action.payload.formName],
                    [action.payload.paramName]: action.payload.value
                }
            }
        }

        default:
            return state
    }
}

export default ui
