import {combineReducers} from 'redux'

import ui from './ui'
import chain from './chain'
import form from './form'

const rootReducer = combineReducers({
    ui: ui,
    chain: chain,
    form: form
})

export default rootReducer
