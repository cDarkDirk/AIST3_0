import {error, success} from "react-notification-system-redux";
import {
  formTemplateFetchSuccseed,
  chainEditorTemplateFetchSucceed,
  testsListTemplateFetchSucceed,
  dataTemplateFetchSucceed,
  dataTemplateFetchFail,
  formTemplateFetchFail,
  submitChainTemplateSucceed,
  formBuilderChainsFetchSucceed,
  updateChainFormSucceed,
  testBuilderTestsFetchSucceed,
  resetModificationMarkers,
  dataTemplatesFetchSuccess,
  updateDataTemplateSuccess,
} from './actions';
import axios from 'axios';
import {BACKEND_URL} from "./constants/endpoints";

export const submitFormTemplate = (formName, formTemplate, sheduleList, templates) => (dispatch) => {

//TODO Дима, добавь коментарий с описанием и убери в конец списка
    const dataToSendLauncherPageBody = {
       paramData: formTemplate
   };

  const dataToSendLauncherPageHeaders = {headers: {
    formName: formName,
    template: templates,
    start_time: sheduleList
  }};

  const url = `${BACKEND_URL}/chains`;

  axios.put(url, dataToSendLauncherPageBody, dataToSendLauncherPageHeaders).then(function () {
    dispatch(success({message: "Submit succeeded!"}));
  }).catch(function (response) {
    dispatch(error({message: "Submit failed with error!" + response}));
  });
};

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

export const fetchDataTemplatesList = () => (dispatch, getState) => {
    const url = `${BACKEND_URL}/data_templates`;

    axios.get(url).then(function (response) {
      dispatch(dataTemplateFetchSucceed(response.data));
    }).catch(function (response) {
      dispatch(dataTemplateFetchFail());
      dispatch(error({message: "Fetch failed with error!" + response}));
    });
};

export const updateChainTemplate = (chainTemplate) => (dispatch, getState) => {

  const requestBody = {
    name: chainTemplate.name,
    marker: chainTemplate.marker,
    fields: chainTemplate.fields,
    tests: chainTemplate.tests,
  };

  if(chainTemplate.modified){
    const url = `${BACKEND_URL}/chain_templates/${chainTemplate.name}`;
    axios.post(url, requestBody).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(submitChainTemplateSucceed());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
  if(chainTemplate.new){
    const url = `${BACKEND_URL}/chain_templates`;
    axios.put(url, requestBody).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(submitChainTemplateSucceed());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
};

export const fetchFormTemplate = (formName) => (dispatch) => {
  const url = `${BACKEND_URL}/forms/${formName}`;

  axios.get(url).then(function (response) {
    dispatch(formTemplateFetchSuccseed({
      formName: formName,
      formTemplate: response.data,
    }));
  }).catch(function (response) {
    dispatch(formTemplateFetchFail());
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
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
export const updateChainForm = (chainName, chain, idx) => (dispatch) => {
  const url = `${BACKEND_URL}/chain_templates/${chainName}`;

  axios.post(url, [chain]).then(function () {
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

  axios.get(url).then(function (response) {
    dispatch(testBuilderTestsFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
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
  const data = [...submitData.value.data];
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

  const requestBody = {
    name: submitData.value.name,
    data: data
  };

  if (submitData.value.modified){
    const url = `${BACKEND_URL}/templates/${submitData.name}`;

    axios.post(url, [requestBody]).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(updateDataTemplateSuccess());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
  if (submitData.value.new){
    const url = `${BACKEND_URL}/templates`;

    axios.put(url, requestBody).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(updateDataTemplateSuccess());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }

};

export const filterDirectoryData = (filterData) => (dispatch) => {

  const url = `${BACKEND_URL}/filterDataDirectory`;

  axios.post(url, filterData).then(function () {
    //  TODO обработка полученных данных тое диспач
  }).catch(function (response) {
    dispatch(error({message: "failed with error!" + response}));
  });
};
