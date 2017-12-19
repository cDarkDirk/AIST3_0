import {combineReducers} from 'redux'

import ui from './ui'
import chain from './chain'
import form from './form'
import formTemplate from './formTemplate'
import chainTemplates from './chainTemplates'
import test from './test'


const rootReducer = combineReducers({
    ui: ui,
    chain: chain,
    form: form,
    formTemplate,
    chainTemplates,
    test
})

export default rootReducer
