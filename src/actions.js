import {ADD_COUNTER,
    TEST_BLOCK_MOVED,
    FORM_INPUT_CHANGE,
    CHAIN_SELECTED,
    FORM_TEMPLATE_FETCH_SUCCSEED,
    FORM_TEMPLATE_FETCH_FAIL,
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    CHAIN_EDITOR_TEMPLATE_FETCH_FAIL,
    TEST_FETCH_SUCCEED,
    TEST_FETCH_FAIL,
    CHAIN_TEMPLATE_DELETED,
    CHAIN_TEMPLATE_ADDED,
    CHAIN_TEMPLATE_NAME_CHANGED,
    TEST_BLOCK_CLICKED,
    SUBMIT_BUTTON_CLICKED,
    CLOSE_BUTTON_CLICKED,
    SUBMIT_CHAIN_TEMPLATE_FAIL,
    SUBMIT_CHAIN_TEMPLATE_SUCCEED,

} from './constants'

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

export const chainTemplateNameChanged = (payload) => ({
  type: CHAIN_TEMPLATE_NAME_CHANGED,
  payload: payload
})

export const deleteChainTemplate = (payload) => ({
  type: CHAIN_TEMPLATE_DELETED,
  payload: payload
})

export const addChainTemplate = () => ({
  type: CHAIN_TEMPLATE_ADDED
})

export const formTemplateFetchFail = (payload) => ({
    type: FORM_TEMPLATE_FETCH_FAIL,
    payload: payload
})
export const chainEditorTemplateFetchSucceed = (payload) => ({
    type: CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    payload: payload
})
export const chainEditorTemplateFetchFail = (payload) => ({
    type: CHAIN_EDITOR_TEMPLATE_FETCH_FAIL,
    payload: payload
})
export const testsListTemplateFetchSucceed = (payload) => ({
    type: TEST_FETCH_SUCCEED,
    payload: payload
})
export const testsListTemplateFetchFail = (payload) => ({
    type: TEST_FETCH_FAIL,
    payload: payload
})
export const testBlockClicked = (payload) => ({
    type: TEST_BLOCK_CLICKED,
    payload: payload
})
export const closeButtonClicked = (payload) => ({
    type: CLOSE_BUTTON_CLICKED,
    payload: payload
})

export const submitChainTemplateFail = (payload) => ({
    type: SUBMIT_CHAIN_TEMPLATE_FAIL,
    payload: payload
})
export const submitChainTemplateSucceed = (payload) => ({
    type: SUBMIT_CHAIN_TEMPLATE_SUCCEED,
    payload: payload
})



export const selectChainTemplate = (selectedChain) => ({type: CHAIN_SELECTED, selectedChain})
