import {
    ADD_COUNTER,
    CHAIN_SELECTED
} from '../constants'

const initialState = {
    counter: 0,
    selectedChain: 0
}

const ui = (state = initialState, action) => {
    switch (action.type) {
        case CHAIN_SELECTED: {
            return {
                ...state,
                selectedChain: action.selectedChain
            }

        }
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
