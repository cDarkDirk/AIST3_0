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
import axios from 'axios';
import {BACKEND_URL} from "./constants/endpoints";


const fetchUtil = (url, method = 'GET', data = {}) => {
  const options = {
    method: method,
    headers: {},
  };
  if (method === 'POST') {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
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

export const updateChainForm = (chain, form, idx) => (dispatch) => {
  const url = `${BACKEND_URL}/chain_templates/` + chain + '/form';

  const options = {
    headers: {"Content-Type": "application/json; charset=utf-8"}
  };
  console.log(form);

  axios.put(url, form, options).then(function () {
    dispatch(success({message: "Submit succeeded"}));
    dispatch(updateChainFormSucceed(idx));
  }).catch(function () {
    dispatch(error({message: "Submit failed with error!"}));
    dispatch(updateChainFormFail());
  });
};

export const fetchChainTemplates = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;

  axios.get(url).then(function (response) {
    dispatch(chainEditorTemplateFetchSucceed(response.data));
  }).catch(function () {
    dispatch(error({message: "Submit failed with error!"}));
    dispatch(chainEditorTemplateFetchFail());
  });

  /*fetchUtil(url).then(response => {
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
  })*/
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
    //TODO апдейтить или штсертить в зависимости от modified и new
    const url = `${BACKEND_URL}/chain_templates/${chainTemplate.name}`;

    const result = {
      "name": chainTemplate.name,
      "tests": chainTemplate.tests,
      "fields": chainTemplate.fields,
      "marker": chainTemplate.marker,
    };
    console.log(chainTemplate);

    if (chainTemplate.modified) {
      const url = `${BACKEND_URL}/chain_templates/${chainTemplate.name}`;

      const options = {
        headers: {"Content-Type": "application/json; charset=utf-8"}
      };

      axios.post(url, [result], options).then(function () {
        dispatch(success({message: "Submit succeeded"}));
        dispatch(submitChainTemplateSucceed());
      }).catch(function () {
        dispatch(error({message: "Submit failed with error!"}));
        dispatch(submitChainTemplateFail())
      });

    } else if (chainTemplate.new) {
      const options = {
        headers: {"Content-Type": "application/json; charset=utf-8"},
      };

      const url = `${BACKEND_URL}/chain_templates`;

      axios.put(url, [result], options).then(function () {
        dispatch(success({message: "Submit succeeded"}));
        dispatch(submitChainTemplateSucceed());
      }).catch(function () {
        dispatch(error({message: "Submit failed with error!"}));
        dispatch(submitChainTemplateFail())
      });
    }
  }
;

export const insertChainTemplate = (chainTemplate) => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;
  let header = new Headers();
  header.append('Content-Type', 'application/json');
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
      dispatch(error({message: "Submit failed with error!"}));
      dispatch(submitChainTemplateFail())
    }
  }).catch(error => {
    throw error
  })
};

export const fetchBuilderChains = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;

  axios.get(url).then(function (response) {
    dispatch(formBuilderChainsFetchSucceed(response.data))
  }).catch(function () {
    dispatch(formBuilderChainsFetchFail())
  });

  /*const options = {
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
  })*/
};

export const submitTest = (testObject) => (dispatch, getState) => {

  const result = [{
    test_id: testObject.test.test_id,
    test_name: testObject.test.test_name,
    job_trigger: testObject.test.job_trigger,
    tag_names: testObject.test.tag_names,
  }];

  if (testObject.test.modified) {
    const updateTestUrl = `${BACKEND_URL}/tests/${testObject.id}`;

    const options = {
      headers: {"Content-Type": "application/json; charset=utf-8"}
    };

    axios.post(updateTestUrl, result, options).then(function () {
      dispatch(success({message: "Submit succeeded"}));
      dispatch(resetModificationMarkers());
    }).catch(function () {
      dispatch(error({message: "Submit failed with error!"}));
    });
  }
  if (testObject.test.new) {
    const addTestUrl = `${BACKEND_URL}/tests`;

    const options = {
      headers: {"Content-Type": "application/json; charset=utf-8"}
    };

    axios.put(addTestUrl, result, options).then(function () {
      dispatch(success({message: "Submit succeeded"}));
      dispatch(resetModificationMarkers());
    }).catch(function () {
      dispatch(error({message: "Submit failed with error!"}));
    });
  }
};
