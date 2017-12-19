import {combineReducers} from 'redux'

import ui from './ui'
import chain from './chain'
import form from './form'
import formTemplate from './formTemplate'
import chainTemplates from './chainTemplates'


const rootReducer = combineReducers({
    ui: ui,
    chain: chain,
    form: form,
    formTemplate,
    chainTemplates
})

export default rootReducer
