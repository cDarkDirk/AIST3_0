import {combineReducers} from 'redux'
import {reducer as notifications} from 'react-notification-system-redux';
import ui from './ui'
import scheduleForm from './scheduleForm'
import formTemplate from './formTemplate'
import chainTemplates from './chainTemplates'
import test from './test'
import dataTemplate from './dataTemplate'
import formBuilder from './formBuilder'
import testBuilder from "./TestBuilder";
import dataTemplatesBuilderReducer from "./DataTemplates";


const rootReducer = combineReducers({
  ui: ui,
  scheduleForm: scheduleForm,
  formTemplate,
  chainTemplates,
  test,
  dataTemplate,
  formBuilder,
  testBuilder,
  dataTemplatesBuilderReducer,
  notifications,
});

export default rootReducer
