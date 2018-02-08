import {error, success} from "react-notification-system-redux"
import {
  formTemplateFetchSuccseed,
  chainEditorTemplateFetchSucceed,
  testsListTemplateFetchSucceed,
  dataTemplateFetchSucceed,
  dataTemplateFetchFail,
  formTemplateFetchFail,
  submitChainTemplateFail,
  submitChainTemplateSucceed,
  formBuilderChainsFetchSucceed,
  updateChainFormSucceed,
  testBuilderTestsFetchFail,
  testBuilderTestsFetchSucceed,
  resetModificationMarkers,
  dataTemplatesFetchSuccess,
} from './actions'
import axios from 'axios';
import {BACKEND_URL} from "./constants/endpoints";

/** GET request example
  axios.get(url).then(function (response) {
    dispatch(fetchSuccessFunction(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
*/

/** POST request example
  axios.post(url, requestBody).then(function () {
    dispatch(success({message: "Submit succeeded!"}));
  }).catch(function (response) {
    dispatch(error({message: "Submit failed with error!" + response}));
  });
*/

/** PUT request example
  axios.put(url, requestBody).then(function () {
    dispatch(success({message: "Submit succeeded!"}));
  }).catch(function (response) {
    dispatch(error({message: "Submit failed with error!" + response}));
  });
*/

const fetchUtil = (url, method = 'GET', data = {}) => {
  //TODO remove this when everything will be working on axios

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

export const fetchDataTemplatesList = () => {
  return (dispatch, getState) => {
    //TODO remove this if not needed
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
  //todo do not use this realization on merge with /launcherPage
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  const options = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(chainTemplate)
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

export const fetchFormTemplate = (formName) => (dispatch) => {
  const url = `${BACKEND_URL}/forms/${formName}`;

  //TODO delete this if not used

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

/**
 * Tests list element
 * fetching data from database
 */
export const fetchTests = () => (dispatch) => {
  const url = `${BACKEND_URL}/tests`;

  axios.get(url).then(function (response) {
    dispatch(testsListTemplateFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Chain builder page
 * fetching data from database
 */
export const fetchChainTemplates = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;

  axios.get(url).then(function (response) {
    dispatch(chainEditorTemplateFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Form builder
 * fetching data from database
 */
export const fetchBuilderChains = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;

  axios.get(url).then(function (response) {
    dispatch(formBuilderChainsFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "fetch failed with error!" + response}));
  });
};

/**
 * Form builder
 * submit data to database
 */
export const updateChainForm = (chain, form, idx) => (dispatch) => {
  const url = `${BACKEND_URL}/${chain}/form`;

  axios.post(url, [form]).then(function () {
    dispatch(success({message: "Submit succeeded!"}));
    dispatch(updateChainFormSucceed(idx));
  }).catch(function (response) {
    dispatch(error({message: "Submit failed with error!" + response}));
  });
};

/**
 * Test Builder
 * fetching data from database
 */
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

/**
 * Test Builder
 * Submit data to database
 */
export const submitTest = (testObject) => (dispatch, getState) => {
  const result = [{
    test_id: testObject.test.test_id,
    test_name: testObject.test.test_name,
    job_trigger: testObject.test.job_trigger,
    tag_names: testObject.test.tag_names,
  }];

  if (testObject.test.modified) {
    const updateTestUrl = `${BACKEND_URL}/tests/${testObject.id}`;

    axios.post(updateTestUrl, result).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(resetModificationMarkers());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
  if (testObject.test.new) {
    const addTestUrl = `${BACKEND_URL}/tests`;

    axios.put(addTestUrl, result).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(resetModificationMarkers());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
};

/**
 *  Data Templates Builder
 *  fetching data from database
 */
export const fetchDataTemplates = () => (dispatch) => {
  const url = `${BACKEND_URL}/templates`;

  axios.get(url).then(function (response) {
    dispatch(dataTemplatesFetchSuccess(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Data Templates Builder
 * validate values before submit
 */

export const validateDTBSubmitValue = (submitData) => (dispatch) => {
  const data = submitData.value.data;
  const checkArray= [];
  for (let entry of data){
    if (checkArray.indexOf(entry.key) === -1) {
      checkArray.push(entry.key);
    } else {
      dispatch(error({message: "Keys are duplicated! Duplicated key: "+entry.key}));
      return;
    }
  }
  dispatch(submitDataTemplates(submitData));
};

/**
 * Data Templates Builder
 * submit data to database
 */
export const submitDataTemplates = (submitData) => (dispatch) => {
  const data = submitData.value.data.reduce((acc, current) => {
    acc[current.key] = current.value;
    return acc;
  }, {});
  console.log(submitData.value.data, data);

  const requestBody = {
    name: submitData.value.name,
    data: data
  };

  if (submitData.value.modified){
    const url = `${BACKEND_URL}/templates/${submitData.name}`;

    axios.post(url, requestBody).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
  if (submitData.value.new){
    const url = `${BACKEND_URL}/templates`;

    axios.put(url, requestBody).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }

};
