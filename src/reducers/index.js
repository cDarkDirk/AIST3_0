import {combineReducers} from 'redux'

import ui from './ui'
import form from './form'
import scheduleForm from  './scheduleForm'

const rootReducer = combineReducers({
    ui: ui,
    form: form,
    scheduleForm: scheduleForm
})

export default rootReducer
