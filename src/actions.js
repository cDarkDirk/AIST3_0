import {ADD_COUNTER, TEST_BLOCK_MOVED, FORM_INPUT_CHANGE} from './constants'

export const addCounter = () => ({type: ADD_COUNTER})

export const onFormInputChange = (value,keyName,formName) => ({
    type: FORM_INPUT_CHANGE,
    payload: {value,keyName,formName}
})

export const testBlockMoved = (payload) => ({
    type: TEST_BLOCK_MOVED,
    payload: payload
})
