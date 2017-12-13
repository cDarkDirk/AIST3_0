import {ADD_COUNTER, TEST_BLOCK_MOVED, FORM_INPUT_CHANGE, CHAIN_SELECTED} from './constants'

export const addCounter = () => ({type: ADD_COUNTER})

export const onFormInputChange = (value,keyName,formName) => ({
    type: FORM_INPUT_CHANGE,
    payload: {value,keyName,formName}
})

export const testBlockMoved = (payload) => ({
    type: TEST_BLOCK_MOVED,
    payload: payload
})

export const chainSelected = (selectedChain) => ({type: CHAIN_SELECTED, selectedChain})
