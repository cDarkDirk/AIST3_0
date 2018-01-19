import {error, success} from "react-notification-system-redux"
//import axios from 'axios';
import {
  formTemplateFetchSuccseed,
  chainEditorTemplateFetchSucceed,
  chainEditorTemplateFetchFail,
  testsListTemplateFetchSucceed,
  testsListTemplateFetchFail,
  dataTemplateFetchSucceed,
  dataTemplateFetchFail,
  formTemplateFetchFail,
  submitChainTemplateFail,
  submitChainTemplateSucceed,
  formBuilderChainsFetchSucceed,
  formBuilderChainsFetchFail,
  updateChainFormSucceed,
  updateChainFormFail,
} from './actions'

const BACKEND_URL = "http://localhost:3001/api";

export const fetchFormTemplate = (formName) => (dispatch) => {
  const url = `${BACKEND_URL}/forms/${formName}`;
  const options = {
    method: 'GET',
    headers: {},
  };
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      console.log(response);
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
};

export const updateChainForm = (chain,form,idx) => (dispatch) => {
  const url = `${BACKEND_URL}/`+chain+'/form';
  let header = new Headers();
  header.append('Content-Type','application/json');
  const options = {
    method: 'POST',
    headers: header,
    body: [form],
  };
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(updateChainTemplateResult => {
    if (updateChainTemplateResult) {
      dispatch(success({message: "Submit succeeded"}));
      dispatch(updateChainFormSucceed(idx));
    } else {
      dispatch(error({message: "Submit failed with error:"}));
      dispatch(updateChainFormFail())
    }
  }).catch(error => {
    throw error
  })

  /*axios.post(url, form)
    .then(function () {
      console.log(form);
    })
    .catch(function () {
      console.log('fuck');
    });*/
};

export const fetchChainTemplates = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;
  const options = {
    method: 'GET',
    headers: {},
  };
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(chainTemplates => {
    if (chainTemplates) {
      dispatch(chainEditorTemplateFetchSucceed(chainTemplates))
    } else {
      dispatch(chainEditorTemplateFetchFail())
    }
  }).catch(error => {
    throw error
  })
};

export const fetchTests = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/tests`;
  const options = {
    method: 'GET',
    headers: {},
  };
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(testsListTemplate => {
    if (testsListTemplate) {
      dispatch(testsListTemplateFetchSucceed(testsListTemplate))
    } else {
      dispatch(testsListTemplateFetchFail())
    }
  }).catch(error => {
    throw error
  })
};
export const fetchDataTemplatesList = () => {
  return (dispatch, getState) => {
    const url = `${BACKEND_URL}/data_templates`;
    const options = {
      method: 'GET',
      headers: {},
    };
    fetch(url, options).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    }).then(templateDataList => {
      if (templateDataList) {
        dispatch(dataTemplateFetchSucceed(templateDataList))
      } else {
        dispatch(dataTemplateFetchFail())
      }
    }).catch(error => {
      throw error
    })
  }
};


export const updateChainTemplate = (chainTemplate) => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates/${chainTemplate.name}`;
  let header = new Headers();
  header.append('Content-Type','application/json');
  const options = {
    method: 'POST',
    headers: header,
    body: chainTemplate
  };
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(updateChainTemplateResult => {
    if (updateChainTemplateResult) {
      dispatch(success({message: "Submit succeeded"}));
      dispatch(submitChainTemplateSucceed(updateChainTemplateResult));
    } else {
      dispatch(error({message: "Submit failed with error:"}));
      //TODO return an error
      dispatch(submitChainTemplateFail())
    }
  }).catch(error => {
    throw error
  })
};

export const insertChainTemplate = (chainTemplate) => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;
  let header = new Headers();
  header.append('Content-Type','application/json');
  const options = {
    method: 'PUT',
    headers: header,
    body: chainTemplate
  };
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(updateChainTemplateResult => {
    if (updateChainTemplateResult) {
      dispatch(success({message: "Submit succeeded"}));
      dispatch(submitChainTemplateSucceed(updateChainTemplateResult));
      console.log({chainTemplate});
    } else {
      dispatch(error({message: "Submit failed with error:"}));
      //TODO return an error
      dispatch(submitChainTemplateFail())
    }
  }).catch(error => {
    throw error
  })
};

export const fetchBuilderChains = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;
  const options = {
    method: 'GET',
    headers: {},
  };
  fetch(url, options).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      console.log(response);
      throw new Error(response.statusText)
    }
  }).then(fetchBuilderChains => {
    if (fetchBuilderChains) {
      dispatch(formBuilderChainsFetchSucceed(fetchBuilderChains))
    } else {
      dispatch(formBuilderChainsFetchFail())
    }
  }).catch(error => {
    throw error
  })
};

