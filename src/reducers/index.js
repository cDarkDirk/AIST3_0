import {combineReducers} from 'redux'
import {reducer as notifications} from 'react-notification-system-redux';


import ui from './ui'
import form from './form'
import formTemplate from './formTemplate'
import chainTemplates from './chainTemplates'
import test from './test'


const rootReducer = combineReducers({
    ui: ui,
    form: form,
    formTemplate,
    chainTemplates,
    test,
    notifications
})

export default rootReducer
