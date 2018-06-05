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
  orderCreated,
  launcherUserGroupsFetchSucceed,
  ordersFetchSucceed,
  ordersFetchFail,
  ordersCSVFetchSucceed,
  ordersCSVFetchFail,
  submitRerunOrderSucceed,
  formGroupsFetchSucceed,
  formGroupsForMembersFetchSucceed,
  testListTestsFetchSucceed,
  allChainEditorTemplateFetchSucceed,
} from './actions';
import axios from 'axios';
import {BACKEND_URL} from "./constants/endpoints";
import {getToken, getUserName, setCurrentUser} from './globalFunc';


export const fetchOrdersByName = (chainName, dateFrom, dateTo) => (dispatch, getState) => {
  const header = {headers: {SessionID : getToken()}};
  const url = `${BACKEND_URL}/orders/?chainName=${chainName}&start=${dateFrom}&end=${dateTo}`;

  axios.get(url, header).then(function (response) {
    dispatch(ordersFetchSucceed(response.data));
  }).catch(function (response) {
    dispatch(ordersFetchFail());
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

// //Перезапуск по ID
export const updateOrderRerun = (orderID) => (dispatch) => {

  const url = `${BACKEND_URL}/objects/${orderID}/restartChain`;

  axios.post(url).then(function () {
    dispatch(success({message: "Submit succeeded!"}));
    dispatch(submitRerunOrderSucceed());
  }).catch(function (response) {
    dispatch(error({message: "Submit failed with error!" + response}));
  });
};


//Получение CSV по ID
export const getCSVbyOrderID = (orderID) => (dispatch) => {

  const url = `${BACKEND_URL}/objects/${orderID}/csv`;

  axios.get(url).then(function (response) {
    dispatch(ordersCSVFetchSucceed(response.data));
  }).catch(function (response) {
    dispatch(ordersCSVFetchFail());
    dispatch(error({message: "Fetch failed with error!" + response}));
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

/**
 * Create new getGroups
 */

export const updatePersonalForm = (payload) => (dispatch) => {
  if (payload.groupName === "" ){
    dispatch(error({message: "Error: Field getGroups name empty"}));
    return;
  }
  const url = `${BACKEND_URL}/owners/personal`;
  const header = {headers: {SessionID : getToken()}};
  const requestBody = {groupName : payload.groupName};
  axios.put(url,[requestBody], header).then(function (response) {
    dispatch(success({message: "Group was created"}));
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
  payload.groupName = "";

};

/**
 * Validation login and password
 * Public key request for create account
 */

export const getPublicKeyRegistration = (payload) => (dispatch) => {
  if (payload.login === "" || payload.password === "" || payload.confirmPassword === "") {
    dispatch(error({message: "Error: Not all fields was  filled"}));
    return;
  }
  if (payload.password !== payload.confirmPassword) {
    dispatch(error({message: "Error: Passwords was different"}));
    return;
  }

  const url = `${BACKEND_URL}/owners/registration`;
  axios.get(url).then(function (response) {
    dispatch(updateRegistrationForm(payload, response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Encrypt user Password
 * Using the public key from server
 */

export const encryptPassword = (payload, publicKey) => {
  let a = JSON.stringify(publicKey);
  let RSAKey = require('react-native-rsa');
  let rsa = new RSAKey();
  rsa.setPublicString(a);
  payload.password = rsa.encrypt(payload.password);
};

/**
 * Send login and encrypt password to server
 * If all OK create account
 */

export const updateRegistrationForm = (payload, publicKey) => (dispatch) => {
  let a = payload.password;
  encryptPassword(payload, publicKey);
  const url = `${BACKEND_URL}/owners/registration`;
  axios.put(url, payload).then(function (response) {
    window.location.hash = '#/';
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });

};
/**
 * Validation login and password
 * Public key request
 */

export const getPublicKeyLogin = (payload) => (dispatch) => {
  if (payload.login === "" || payload.password === "") {
    dispatch(error({message: "Error: Not all fields was filled"}));
    return;
  }
  const url = `${BACKEND_URL}/owners/login`;
  axios.get(url).then(function (response) {
    dispatch(updateLoginForm(payload, response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Send owners and encrypt password to server
 * If all OK go to homepage
 */

export const updateLoginForm = (payload, publicKey) => (dispatch) => {
  let a = payload.password;
  encryptPassword(payload, publicKey);
  const url = `${BACKEND_URL}/owners/login`;
  axios.post(url, payload).then(function (response) {
    payload.token = response.data.token;
    setCurrentUser(payload.login, response.data);
    window.location.hash = '#/homepage';

  }).catch(function (response) {
    payload.password = a;
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

export const fetchDataTemplatesList = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/templates`;
  const header = {headers: {SessionID : getToken()}};

  axios.get(url).then(function (response) {
    dispatch(dataTemplateFetchSucceed(response.data));
  }).catch(function (response) {
    dispatch(dataTemplateFetchFail());
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
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
  const header = {headers: {SessionID : getToken()}};
  axios.get(url, header).then(function (response) {
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
  const header = {headers: {SessionID : getToken()}};
  axios.get(url,header).then(function (response) {
    dispatch(allChainEditorTemplateFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Chain builder page
 * update chain if modified
 * insert chain if new
 */
export const updateChainTemplate = (chainTemplate) => (dispatch, getState) => {
  const requestBody = {
    name: chainTemplate.value.name,
    marker: chainTemplate.value.marker,
    fields: chainTemplate.value.fields,
    tests: chainTemplate.value.tests,
    templates: chainTemplate.value.templates.map(t => t.value),
    groups: chainTemplate.value.groups.map(t => t.label),
  };
  const header = {headers: {SessionID : getToken()}};
  if (chainTemplate.value.modified) {
    const url = `${BACKEND_URL}/chain_templates/${chainTemplate.name}`;
    axios.post(url, [requestBody], header).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(submitChainTemplateSucceed());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
  if (chainTemplate.value.new) {
    const url = `${BACKEND_URL}/chain_templates`;
    axios.put(url, [requestBody], header).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(submitChainTemplateSucceed());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
};

/**
 * Form builder
 * fetching data from database
 */
export const fetchBuilderChains = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/chain_templates`;
  const header = {headers: {SessionID: getToken()}};
  axios.get(url,header ).then(function (response) {
    dispatch(formBuilderChainsFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "fetch failed with error!" + response}));
  });
};

/**
 * fetching groups for owner from database
 */
export const fetchGroups = () => (dispatch, getState) => {
  const url = `${BACKEND_URL}/owners/personal`;
  const header = {headers: {SessionID : getToken()}};
  axios.get(url, header).then(function (response) {
    dispatch(formGroupsFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "fetch failed with error!" + response}));
  });
};

/**
 * fetching groups for owner and members from database
 */
export const fetchGroupsForMembers = () => (dispatch) => {
  const url = `${BACKEND_URL}/owners/personal`;
  const header = {headers: {SessionID : getToken()}};
  axios.get(url,header).then(function (response) {
    dispatch(formGroupsForMembersFetchSucceed(response.data))
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
  let tempArr = [];
  for (let field of chain.fields) {
    if (tempArr.indexOf(field.paramName) === -1) {
      tempArr.push(field.paramName);
    } else {
      dispatch(error({message: "Названия параметров дублируются! Дублирубющийся параметр: " + field.paramName}));
      return;
    }
  }
  const header = {headers: {SessionID: getToken()}};
  axios.post(url, [chain], header).then(function () {
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
  const header = {headers: {SessionID : getToken()}};

  axios.get(url, header).then(function (response) {
    dispatch(testBuilderTestsFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Test List
 * fetching data from database
 */
export const testListDataFetch = () => (dispatch) => {
  const url = `${BACKEND_URL}/tests`;
  const header = {headers: {SessionID : getToken()}};

  axios.get(url, header).then(function (response) {
    dispatch(testListTestsFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Test Builder
 * Submit data to database
 */
export const submitTest = (testObject) => (dispatch, getState) => {
  let staticTags, dynamicTags;
  let tags = {};
  if (testObject.test.tag_names.static.length > 0){
    staticTags = testObject.test.tag_names.static.map(t => t.label);
    tags.static = staticTags;
  }
  if (testObject.test.tag_names.dynamic.length > 0){
    dynamicTags = testObject.test.tag_names.dynamic.map(t => t.label);
    tags.dynamic = dynamicTags;
  }
  const result = [{
    test_name: testObject.test.test_name,
    job_trigger: testObject.test.job_trigger,
    tag_names: tags,
    stands: testObject.test.stands,
    a_system: testObject.test.a_system,
  }];
  const header = {headers: {SessionID : getToken()}};
  if (testObject.test.modified) {
    const updateTestUrl = `${BACKEND_URL}/tests/${testObject.id}`;
    axios.post(updateTestUrl, result, header).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(resetModificationMarkers());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
  if (testObject.test.new) {
    const addTestUrl = `${BACKEND_URL}/tests`;

    axios.put(addTestUrl, result, header).then(function () {
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
  const header = {headers: {SessionID : getToken()}};
  axios.get(url, header).then(function (response) {
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
  const checkArray = [];
  for (let entry of data) {
    if (checkArray.indexOf(entry.key) === -1) {
      checkArray.push(entry.key);
    } else {
      dispatch(error({message: "Keys are duplicated! Duplicated key: " + entry.key}));
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
  const header = {headers: {SessionID : getToken()}};

  const requestBody = {
    name: submitData.value.name,
    data: data
  };

  if (submitData.value.modified) {
    const url = `${BACKEND_URL}/templates/${submitData.name}`;

    axios.post(url, [requestBody], header).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(updateDataTemplateSuccess());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }
  if (submitData.value.new) {
    const url = `${BACKEND_URL}/templates`;

    axios.put(url, [requestBody], header).then(function () {
      dispatch(success({message: "Submit succeeded!"}));
      dispatch(updateDataTemplateSuccess());
    }).catch(function (response) {
      dispatch(error({message: "Submit failed with error!" + response}));
    });
  }

};

export const filterDirectoryData = (filterData) => (dispatch) => {
  //TODO Добавить коментарий с описанием метода

  const url = `${BACKEND_URL}/filterDataDirectory`;

  axios.post(url, filterData).then(function () {
    //  TODO обработка полученных данных тое диспач
  }).catch(function (response) {
    dispatch(error({message: "failed with error!" + response}));
  });
};

/**
 * Launcher page
 * creates new order
 */
export const submitFormTemplate = (params) => (dispatch) => {

  const url = `${BACKEND_URL}/orders`;
  const header = {headers: {SessionID : getToken()}};
  axios.put(url, [params], header).then(function (response) {
    dispatch(orderCreated(response.data.message));
  }).catch(function (response) {
    dispatch(error({message: "Submit failed with error!" + response}));
  });
};

/**
 * All pages
 * gets information from dictionary and
 * dispatches provided action
 *
 * @param dictionary - dictionary name (systems, stands, test_types)
 * @param onSuccess - action to dispatch response
 * @returns {function(*)}
 */

export const getDictionaryData = (dictionary, onSuccess) => (dispatch) => {
  const url = `${BACKEND_URL}/dictionaries/${dictionary}`;

  axios.get(url).then(function (response) {
    dispatch(onSuccess(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Launcher
 * Получить группы, в которых состоит текущий пользователь
 * @returns {function(*)}
 */
export const getUsersGroups = () => (dispatch) => {
  const url = `${BACKEND_URL}/owners/personal/getGroups`;
  const header = {headers: {SessionID : getToken()}};
  axios.get(url, header).then(function (response) {
    dispatch(launcherUserGroupsFetchSucceed(response.data))
  }).catch(function (response) {
    dispatch(error({message: "Fetch failed with error!" + response}));
  });
};

/**
 * Pesonal page
 * update getGroups members
 */
export const submitFormMembers = (params) => (dispatch) => {

  const url = `${BACKEND_URL}/owners/personal`;
  const header = {headers: {SessionID : getToken()}};
  axios.post(url, [params], header).then(function (response) {
    dispatch(success({message:"Update succeeded"}));
  }).catch(function (response) {
    dispatch(error({message: "Submit failed with error!" + response}));
  });
};

/**
 * All pages
 * Запрос на фильтрацию по тегам.
 * @param tags - тело запроса (сами теги)
 * @param entity - название таблицы. На момент написания комментария доступны 'tests' и 'chain_templates'
 * @param ...props - дополнительные параметры, для передачи в редьюсер, например другие фильтры
 * @param callback - функция для обработки возвращаемого значения
 */
export const filterEntityByTags = (tags, entity, callback, {...props}) => (dispatch) => {
  const url = `${BACKEND_URL}/${entity}/filter`;

  axios.post(url, tags).then(function (response) {
    dispatch(callback(response.data, props));
  }).catch(function (response) {
    dispatch(error({message: "Request failed with error!" + response.message}));
  });
};
