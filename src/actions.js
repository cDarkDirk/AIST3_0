import {ADD_COUNTER, TEST_BLOCK_MOVED} from './constants'

export const addCounter = () => ({type: ADD_COUNTER})

export const testBlockMoved = (payload) => ({type: TEST_BLOCK_MOVED, payload})
