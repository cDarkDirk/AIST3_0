//import {} from '@/actions'
import {formTemplateFetchSuccseed,
    formTemplateFetchFail,
    chainEditorTemplateFetchSucseed,
    chainEditorTemplateFetchFail} from './actions'
const BACKEND_URL = "http://localhost:3001/api";

export const fetchFormTemplate = (formName) => (dispatch, getState) => {
  const url = `${BACKEND_URL}/forms/${formName}`
  const options = {
    method: 'GET',
    headers: { },
  }
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
        console.log(response)
      throw new Error(response.statusText)
    }
  }).then(formTemplate => {
    if (formTemplate) {
        dispatch(formTemplateFetchSuccseed({
            formName: formName,
            formTemplate: formTemplate
        }))
    } else {
        dispatch(formTemplateFetchFail())
    }
  }).catch(error => {
        throw error
  })
}

export const fetchChainEditorTemplate = () => (dispatch, getState) => {
    const url = `${BACKEND_URL}/chain_templates`
    const options = {
        method: 'GET',
        headers: { },
    }
    fetch(url, options).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            console.log(response)
            throw new Error(response.statusText)
        }
    }).then(chainTemplatesTemplate => {
        if (chainTemplatesTemplate) {
            dispatch(chainEditorTemplateFetchSucseed(chainTemplatesTemplate))
        } else {
            dispatch(chainEditorTemplateFetchFail())
        }
    }).catch(error => {
        throw error
    })
}
