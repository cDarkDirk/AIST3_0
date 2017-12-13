//import {} from '@/actions'
import {formTemplateFetchSuccseed,formTemplateFetchFail} from './actions'
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
        dispatch(formTemplateFetchSuccseed({formName, formTemplate}))
    } else {
        dispatch(formTemplateFetchFail())
    }
  }).catch(error => {
        throw error
  })
}
