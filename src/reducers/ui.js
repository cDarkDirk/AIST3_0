import {
  ADD_COUNTER,
} from '../constants'

const initialState = {
  counter: 0,
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTER: {
      return {
        ...state,
        counter: state.counter + 1,
      }
    }
    default:
      return state
  }
}

export default ui
