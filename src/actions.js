import {ADD_COUNTER, TEST_BLOCK_MOVED, CHAIN_SELECTED} from './constants'

export const addCounter = () => ({type: ADD_COUNTER})

export const testBlockMoved = (payload) => ({type: TEST_BLOCK_MOVED, payload})
export const chainSelected = (selectedChain) => ({type: CHAIN_SELECTED, selectedChain})

