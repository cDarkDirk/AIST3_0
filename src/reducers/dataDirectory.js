import {
  FILTER_DATA_DIRECTORY,
  ORDERS_FETCH_SUCCEED,
  ORDERS_FETCH_FAIL,
  SUBMIT_RERUN_ORDER_SUCCEED
} from '../constants'

const initialState = {
  data: [],
};

const dataDirectoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_DATA_DIRECTORY: {
      // TODO
      return {
        ...state,
      }
    }
    case ORDERS_FETCH_SUCCEED: {
      return {
        ...state,
        data: action.payload
      }
    }
    case ORDERS_FETCH_FAIL: {
      return {
        ...state,
        data: action.payload
      }
    }
    case SUBMIT_RERUN_ORDER_SUCCEED: {
      return {
        ...state,
        data: action.payload
      }
    }
    default:
      return state
  }

};
export default dataDirectoryReducer
