import {LAUNCHER_CHAIN_SELECTED} from "../constants";

const initialState = {
  selectedChain: null,
};

const launcher = (state = initialState, action) => {
  switch (action.type) {
    case LAUNCHER_CHAIN_SELECTED:{

      return {
        ...state,
        selectedChain: action.index,
      }
    }

    default:
      return state
  }
};

export default launcher;
