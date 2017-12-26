import {
} from '../constants'
import {DATA_TEMPLATE_LIST_SUCCEED} from "../constants";

const initialState = {dataTemplates:[]}

const dataTemplate = (state = initialState, action) => {
    switch (action.type){
        case DATA_TEMPLATE_LIST_SUCCEED:
        {
            return {...state,dataTemplates: action.payload}
        }
        default: return state
    }
}

export default dataTemplate
