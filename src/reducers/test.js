import {
  TEST_FETCH_SUCCEED
} from '../constants'

const initialState = null;
// const initialState = {
//   stands: [],
// };

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_FETCH_SUCCEED: {
            return action.payload
        }
        default:
            return state
    }
  console.log("pay - " + action.payload);
};

export default testReducer
