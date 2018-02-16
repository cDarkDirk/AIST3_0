import {combineReducers} from 'redux'
import {reducer as notifications} from 'react-notification-system-redux'
import form from './form'
import scheduleForm from './scheduleForm'
import formTemplate from './formTemplate'
import chainTemplates from './chainTemplates'
import test from './test'
import dataTemplate from './dataTemplate'
import formBuilder from './formBuilder'
import launcher from "./launcher"
import testBuilder from "./TestBuilder"
import dataTemplatesBuilderReducer from "./DataTemplates"
import dataDirectory from './dataDirectory'


const rootReducer = combineReducers({
  launcher,
  form,
  scheduleForm: scheduleForm,
  formTemplate,
  chainTemplates,
  test,
  dataTemplate,
  formBuilder,
  testBuilder,
  dataTemplatesBuilderReducer,
  notifications,
  dataDirectory,
});

export default rootReducer
