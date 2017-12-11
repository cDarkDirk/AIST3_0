import {
  TEST_BLOCK_MOVED,
} from '../constants'

const initialState = {
  tests: [
    {
      position: {x: 0, y: 0}
    }
  ],
}

const chain = (state = initialState, action) => {
  switch (action.type) {
    case TEST_BLOCK_MOVED: {
      return {
        ...state,
        counter: state.counter + 1,
      }
    }
    default:
      return state
  }
}

export default chain
