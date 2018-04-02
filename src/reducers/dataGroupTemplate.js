import {
  DATA_TEMPLATE_LIST_SUCCEED,
  TEMPLATE_FORM_INPUT_CHANGE,
} from "../constants"

const initialState = {
  dataGroupTemplates: [],
  choosenDataGroupTemplate: [],
};


const dataGroupTemplate = (state = initialState, action) => {
  switch (action.type) {
    case DATA_GROUP_TEMPLATE_LIST_SUCCEED: {
      return {...state, dataGroupTemplates: action.payload.groups}
    }

    case TEMPLATE_GROUP_FORM_INPUT_CHANGE: {
      return {...state, choosenDataGroupTemplate: action.payload.groups.value}
    }

    default:
      return state
  }
};

export default dataGroupTemplate
