import {
  TEST_BLOCK_MOVED,
} from '../constants'

const initialState = {
  tests: [
    {
      name: 'First test'
    },
    {
      name: 'Second test'
    },
    {
      name: 'Third test'
    },
    {
      name: 'Fourth test'
    }
  ],
}

const chain = (state = initialState, action) => {
  switch (action.type) {
    case TEST_BLOCK_MOVED: {
      const {oldIndex, newIndex} = action.payload
      let tests = [...state.tests]
      tests.splice(newIndex, 0, tests.splice(oldIndex, 1)[0]);
      return {
        ...state,
        tests
      }
    }
    default:
      return state
  }
}

export default chain
