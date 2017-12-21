import {combineReducers} from 'redux'

import ui from './ui'
import form from './form'
import scheduleForm from  './scheduleForm'
import formTemplate from './formTemplate'
import chainTemplates from './chainTemplates'
import test from './test'
import dataTemplate from './dataTemplate'


const rootReducer = combineReducers({
    ui: ui,
    form: form,
    scheduleForm: scheduleForm,
    formTemplate,
    chainTemplates,
    test,
    dataTemplate
})

export default rootReducer
