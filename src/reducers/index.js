import {combineReducers} from 'redux'

import ui from './ui'
import chain from './chain'
import form from './form'
import scheduleForm from  './scheduleForm'

const rootReducer = combineReducers({
    ui: ui,
    chain: chain,
    form: form,
    scheduleForm: scheduleForm
})

export default rootReducer
