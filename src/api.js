import {error, success} from "react-notification-system-redux"
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
  testBuilderTestsFetchFail,
  testBuilderTestsFetchSucceed,
  resetModificationMarkers,
} from './actions'
import {BACKEND_URL} from "./constants/endpoints";
import sjcl from 'sjcl';
import validateInput from "./components/AuthorizationPage/validator";
import isEmpty from "lodash/isEmpty";
import HomePage from "./containers/HomePage";
import history from './history';


const fetchUtil = (url, method = 'GET', data = {}) => {
  const options = {
    method: method,
    headers: {},
  };
  if (method === 'POST') {
    let header = new Headers();
    header.append('Content-Type','application/json');
    options.headers = header;
    options.body = data;
  }
  return fetch(url, options);
};


export const fetchFormTemplate = (formName) => (dispatch) => {
  const url = `${BACKEND_URL}/forms/${formName}`;

  fetchUtil(url).then(response => {
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

export const updateLoginSucceed = (history) =>() => {
  console.log("ЕЕЕ  РОК");
  history.push('/homepage');
};

export const updateLoginForm = (payload, history) => (dispatch) => {
  // console.log(payload.password);

  console.log(payload.password.toString());
  if (payload.name === "" || payload.password === "") {
     dispatch(error({message: "Error: Not all fields was filled"}));
     return;
  }
  payload.password = sjcl.encrypt('AIST',payload.password);
  payload.password = sjcl.decrypt('AIST', payload.password);
    // const url = `${BACKEND_URL}/login`;

    // console.log(payload);
  fetchUtil(url, 'POST', payload).then(response => {
    if (response.ok) {
      console.log(response.json("token"));
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(updateChainTemplateResult => {
    if (updateChainTemplateResult) {
      dispatch(success({message: "Authorization succeeded"}));
      dispatch(updateLoginSucceed(payload));

    } else {
      dispatch(error({message: "Authorization failed with error:"}));
      dispatch(updateChainFormFail())
    }
  }).catch(error => {
    throw error
  })
};

export const updateChainForm = (chain,form,idx) => (dispatch) => {
  const url = `${BACKEND_URL}/`+chain+'/form';

  fetchUtil(url, 'POST', [form]).then(response => {
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
    }
  }).catch(error => {
    throw error
  })
};

export const fetchChainTemplates = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;

  fetchUtil(url).then(response => {
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

export const fetchTests = () => (dispatch) => {
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

export const testBuilderDataFetch = () => (dispatch) => {
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
  }).then(testBuilderTests => {
    if (testBuilderTests) {
      dispatch(testBuilderTestsFetchSucceed(testBuilderTests))
    } else {
      dispatch(testBuilderTestsFetchFail())
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
    } else {
      dispatch(error({message: "Submit failed with error:"}));
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

export const submitTest = (testObject) => (dispatch, getState)=> {
  const updateTestUrl = `${BACKEND_URL}/tests/${testObject.test_id}`;
  const addTestUrl = `${BACKEND_URL}/tests`;

  const result = [{
    test_id: testObject.test_id,
    test_name: testObject.test_name,
    job_trigger: testObject.job_trigger,
    tag_names: testObject.tag_names,
  }];

  if (testObject.modified) {

    let header = new Headers();
    header.append('Content-Type','application/json');
    const options = {
      method: 'POST',
      headers: header,
      body: result
    };

    fetch(updateTestUrl, options).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    }).then(answer => {
      if (answer) {
        dispatch(success({message: "Submit succeeded!"}));
        dispatch(resetModificationMarkers());
      } else {
        dispatch(error({message: "Submit failed with error!"}));
      }
    }).catch(error => {
      throw error
    })
  }
  if (testObject.new) {
    let header = new Headers();
    header.append('Content-Type','application/json');
    const options = {
      method: 'PUT',
      headers: header,
      body: result
    };

    fetch(addTestUrl, options).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    }).then(answer => {
      if (answer) {
        dispatch(success({message: "Submit succeeded!"}));
        dispatch(resetModificationMarkers());
      } else {
        dispatch(error({message: "Submit failed with error!"}));
      }
    }).catch(error => {
      throw error
    })
  }
};
