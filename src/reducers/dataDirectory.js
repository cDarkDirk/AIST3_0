import {
  FILTER_DATA_DIRECTORY
} from '../constants'

const initialState = {
  data: [],
};

const dataDirectoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_DATA_DIRECTORY: {
      // TODO
    }

    default:
      return state
  }

};
export default dataDirectoryReducer
