import {
  DATA_TEMPLATES_FETCH_SUCCESS,
  DATA_TEMPLATE_SELECTED,
} from '../constants'

const initialState = {
  dataTemplates: [],
  selectedTemplateIndex: null,
};

const dataTemplatesBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_TEMPLATES_FETCH_SUCCESS: {
      const dataTemplates = action.payload.map((template)=> {
        template.modified = false;
        template.new = false;
        return template;
      });
      return {
        ...state,
        dataTemplates,
      }
    }
    case DATA_TEMPLATE_SELECTED: {
      return{
        ...state,
        selectedTemplateIndex: action.payload,
      }
    }
    default:
      return state
  }
};

export default dataTemplatesBuilderReducer
