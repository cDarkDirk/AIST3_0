import { combineReducers } from 'redux'

import ui from './ui'
import chain from './chain'

const rootReducer = combineReducers({
  ui,
  chain,
})

export default rootReducer
