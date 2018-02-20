import {
  DATA_TEMPLATE_LIST_SUCCEED,
  TEMPLATE_FORM_INPUT_CHANGE,
} from "../constants"

const initialState = {
  dataTemplates: [],
  choosenDataTemplates: [],
};


const dataTemplate = (state = initialState, action) => {
  switch (action.type) {
    case DATA_TEMPLATE_LIST_SUCCEED: {
      return {...state, dataTemplates: action.payload}
    }

    case TEMPLATE_FORM_INPUT_CHANGE: {
      return {...state, choosenDataTemplates: action.payload.value}
    }

    default:
      return state
  }
};

export default dataTemplate
