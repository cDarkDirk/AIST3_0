import {combineReducers} from 'redux'

import ui from './ui'
import chain from './chain'
import form from './form'
import formTemplate from './formTemplate'

const rootReducer = combineReducers({
    ui: ui,
    chain: chain,
    form: form,
    formTemplate
})

export default rootReducer
