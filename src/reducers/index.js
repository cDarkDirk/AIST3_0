import {combineReducers} from 'redux'

import ui from './ui'
import form from './form'
import formTemplate from './formTemplate'
import chainTemplates from './chainTemplates'


const rootReducer = combineReducers({
    ui: ui,
    form: form,
    formTemplate,
    chainTemplates
})

export default rootReducer
