import {ADD_COUNTER, TEST_BLOCK_MOVED, FORM_INPUT_CHANGE, CHAIN_SELECTED, FORM_TEMPLATE_FETCH_SUCCSEED,FORM_TEMPLATE_FETCH_FAIL} from './constants'

export const addCounter = () => ({type: ADD_COUNTER})

export const onFormInputChange = (value,paramName,formName) => ({
    type: FORM_INPUT_CHANGE,
    payload: {value,paramName,formName}
})

export const testBlockMoved = (payload) => ({
    type: TEST_BLOCK_MOVED,
    payload: payload
})

export const formTemplateFetchSuccseed = (payload) => ({
    type: FORM_TEMPLATE_FETCH_SUCCSEED,
    payload: payload
})

export const formTemplateFetchFail = (payload) => ({
    type: FORM_TEMPLATE_FETCH_FAIL,
    payload: payload
})

export const chainSelected = (selectedChain) => ({type: CHAIN_SELECTED, selectedChain})
