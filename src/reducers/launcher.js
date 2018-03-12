import {
  CHAIN_SELECTED,
} from '../constants'

const initialState = {
  selectedForm: null,
  formName: null,
};

const launcher = (state = initialState, action) => {
  switch (action.type) {
    case CHAIN_SELECTED: {
      return {
        ...state,
        selectedForm: action.payload.index,
        formName: action.payload.name,
      }
    }

    default:
      return state
  }
};

export default launcher
