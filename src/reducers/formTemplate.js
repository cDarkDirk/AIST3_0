import {
    FORM_TEMPLATE_FETCH_SUCCSEED,
} from '../constants'

const initialState = null;

const formTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORM_TEMPLATE_FETCH_SUCCSEED: {
            return action.payload.formTemplate
        }

        default:
            return state
    }
};

export default formTemplateReducer
