import {
  CHAIN_SELECTED
} from '../constants'

const initialState = {selectedForm: null}

const launcher = (state = initialState, action) => {
  switch (action.type) {
    case CHAIN_SELECTED: {
      return {
        ...state, selectedForm: action.payload
      }
    }


    default:
      return state
  }
}

export default launcher
