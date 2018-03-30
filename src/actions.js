import {
  TEST_BLOCK_MOVED,
  FORM_INPUT_CHANGE,
  CHAIN_SELECTED,
  FORM_TEMPLATE_FETCH_SUCCSEED,
  FORM_TEMPLATE_FETCH_FAIL,
  CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
  SCHEDULE_DATE_CHANGED,
  SCHEDULE_TIME_CHANGED,
  TEST_FETCH_SUCCEED,
  DATA_TEMPLATE_LIST_SUCCEED,
  DATA_TEMPLATE_LIST_FAIL,
  CHAIN_TEMPLATE_DELETED,
  CHAIN_TEMPLATE_ADDED,
  CHAIN_TEMPLATE_NAME_CHANGED,
  TEST_BLOCK_CLICKED,
  CLOSE_BUTTON_CLICKED,
  SUBMIT_CHAIN_TEMPLATE_SUCCEED,
  FORM_BUILDER_CHAINS_FETCH_SUCCEED,
  UPDATE_CHAIN_FORM_SUCCEED,
  NEW_FIELD_ADDED,
  ON_FIELDS_VALUES_UPDATE,
  FIELD_WAS_REMOVED,
  SCHEDULE_AMOUNT_OF_TIMES_CHANGED,
  TEMPLATE_FORM_INPUT_CHANGE,
  TEST_BUILDER_TESTS_FETCH_SUCCEED,
  TEST_SELECTED,
  TEST_BUILDER_FORM_INPUT_CHANGED,
  ADD_NEW_TEST,
  RESET_MODIFICATION_MARKERS,
  DATA_TEMPLATES_FETCH_SUCCESS,
  DATA_TEMPLATE_SELECTED,
  DATA_TEMPLATES_INPUT_CHANGE,
  DATA_TEMPLATE_NAME_CHANGED,
  NEW_DATA_TEMPLATE_ADDED,
  NEW_DATA_TEMPLATE_PARAM_ADDED,
  CHAIN_TEMPLATE_MARKER_CHANGED,
  UPDATE_DATA_TEMPLATE_SUCCESS,
  DUPLICATE_CURRENT_CHAIN,
  LOGIN_BUTTON_CLICKED,
  LOGIN_PASSWORD_CHANGE,
  DATA_TEMPLATE_ADDED,
  ORDERS_FETCH_SUCCEED,
  ORDERS_FETCH_FAIL
  ORDER_CREATED,
  CLEAR_ID_ORDER_ALERT,
  LAUNCHER_STANDS_FETCH_SUCCEED,
  LAUNCHER_USER_GROUPS_FETCH_SUCCEED,
} from './constants'

export const ordersFetchSucceed = (payload) => ({
  type: ORDERS_FETCH_SUCCEED,
  payload,
});

export const ordersFetchFail = (payload) => ({
  type: ORDERS_FETCH_FAIL,
  payload,
});

export const loginButtonClicked = (payload) => ({
  type: LOGIN_BUTTON_CLICKED,
  payload,
});

export const loginPasswordChange = (payload) => ({
  type: LOGIN_PASSWORD_CHANGE,
  payload,
});

export const onFormInputChange = (value, paramName, formName) => ({
  type: FORM_INPUT_CHANGE,
  payload: {value, paramName, formName}
});

export const updateChainFormSucceed = (payload) => ({
  type: UPDATE_CHAIN_FORM_SUCCEED,
  payload: payload
});

export const onTemplateFormInputChange = (value, paramName, formName) => ({
  type: TEMPLATE_FORM_INPUT_CHANGE,
  payload: {value, paramName, formName}
});

export const testBlockMoved = (payload) => ({
  type: TEST_BLOCK_MOVED,
  payload: payload
});

export const formTemplateFetchSuccseed = (payload) => ({
  type: FORM_TEMPLATE_FETCH_SUCCSEED,
  payload: payload
});

export const chainTemplateNameChanged = (payload) => ({
  type: CHAIN_TEMPLATE_NAME_CHANGED,
  payload: payload
});

export const deleteChainTemplate = (payload) => ({
  type: CHAIN_TEMPLATE_DELETED,
  payload: payload
});

export const addChainTemplate = (payload) => ({
  type: CHAIN_TEMPLATE_ADDED,
  payload,
});

export const formTemplateFetchFail = (payload) => ({
  type: FORM_TEMPLATE_FETCH_FAIL,
  payload: payload
});

export const chainEditorTemplateFetchSucceed = (payload) => ({
  type: CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
  payload: payload
});

export const testsListTemplateFetchSucceed = (payload) => ({
  type: TEST_FETCH_SUCCEED,
  payload: payload
});

export const testBlockClicked = (payload) => ({
  type: TEST_BLOCK_CLICKED,
  payload: payload
});

export const closeButtonClicked = (payload) => ({
  type: CLOSE_BUTTON_CLICKED,
  payload: payload
});

export const submitChainTemplateSucceed = () => ({
  type: SUBMIT_CHAIN_TEMPLATE_SUCCEED,
});

export const changeDate = (payload) => ({
  type: SCHEDULE_DATE_CHANGED,
  payload: payload
});

export const changeTime = (payload) => ({
    type: SCHEDULE_TIME_CHANGED,
    payload: payload
});
export const changeAmountOfTimes = (payload) => ({
  type: SCHEDULE_AMOUNT_OF_TIMES_CHANGED,
  payload: payload
});

export const dataTemplateFetchFail = (payload) => ({
  type: DATA_TEMPLATE_LIST_FAIL,
  payload: payload
});

export const dataTemplateFetchSucceed = (payload) => ({
  type: DATA_TEMPLATE_LIST_SUCCEED,
  payload: payload
});

export const formBuilderChainsFetchSucceed = (payload) => ({
  type: FORM_BUILDER_CHAINS_FETCH_SUCCEED,
  payload: payload
});

export const newFieldAdded = (payload) => ({
  type: NEW_FIELD_ADDED,
  payload: payload
});

export const onFieldsValuesUpdate = (payload) => ({
  type: ON_FIELDS_VALUES_UPDATE,
  payload: payload
});

export const fieldWasRemoved = (payload) => ({
  type: FIELD_WAS_REMOVED,
  payload: payload
});

export const testBuilderTestsFetchSucceed = (payload) => ({
  type: TEST_BUILDER_TESTS_FETCH_SUCCEED,
  payload: payload
});

export const testSelected = (payload) => ({
  type: TEST_SELECTED,
  payload: payload
});

export const testBuilderFormInputChanged = (payload) => ({
  type: TEST_BUILDER_FORM_INPUT_CHANGED,
  payload: payload
});

export const newTestAdded = () => ({
  type: ADD_NEW_TEST,
});

export const resetModificationMarkers = () => ({
  type: RESET_MODIFICATION_MARKERS,
});

export const dataTemplatesFetchSuccess = (payload) => ({
  type: DATA_TEMPLATES_FETCH_SUCCESS,
  payload: payload
});

export const setSelectedDataTemplateIndex = (payload) => ({
  type: DATA_TEMPLATE_SELECTED,
  payload: payload
});

export const dataTemplatesInputChange = (payload) => ({
  type: DATA_TEMPLATES_INPUT_CHANGE,
  payload: payload
});

export const dataTemplateNameChanged = (payload) => ({
  type: DATA_TEMPLATE_NAME_CHANGED,
  payload: payload
});

export const newDataTemplateAdded = () => ({
  type: NEW_DATA_TEMPLATE_ADDED,
});

export const newDataTemplateParamAdded = () => ({
  type: NEW_DATA_TEMPLATE_PARAM_ADDED,
});

export const chainSelected = (selectedChain) => ({
  type: CHAIN_SELECTED,
  selectedChain,
});

export const chainTemplateMarkerChanged = (payload) => ({
  type: CHAIN_TEMPLATE_MARKER_CHANGED,
  payload,
});

export const updateDataTemplateSuccess = () => ({
  type: UPDATE_DATA_TEMPLATE_SUCCESS,
});

export const duplicateCurrentChain = (payload) => ({
  type: DUPLICATE_CURRENT_CHAIN,
  payload,
});

export const addDTToChain = (payload) => ({
  type: DATA_TEMPLATE_ADDED,
  payload,
});

export const orderCreated = (id) => ({
  type: ORDER_CREATED,
  id,
});

export const clearIdOrderAlert = () => ({
  type: CLEAR_ID_ORDER_ALERT,
});

export const standsFetchSuccess = (stands) => ({
  type: LAUNCHER_STANDS_FETCH_SUCCEED,
  stands,
});

export const launcherUserGroupsFetchSucceed = (groups) => ({
  type: LAUNCHER_USER_GROUPS_FETCH_SUCCEED,
  groups,
});
