import {
    TEST_FETCH_SUCCEED,
} from '../constants'

const initialState = null;

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_FETCH_SUCCEED: {
            return action.payload
        }
        default:
            return state
    }
};

export default testReducer
