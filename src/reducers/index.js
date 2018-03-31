import {combineReducers} from 'redux'
import {reducer as notifications} from 'react-notification-system-redux'
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
import dataAuthorization from './dataAuthorization'
import dataPersonal from "./dataPersonal";


const rootReducer = combineReducers({
  launcher,
  scheduleForm: scheduleForm,
  formTemplate,
  chainTemplates,
  test,
  dataTemplate,
  formBuilder,
  testBuilder,
  dataAuthorization,
  dataPersonal,
  dataTemplatesBuilderReducer,
  notifications,
  dataDirectory,
});

export default rootReducer
