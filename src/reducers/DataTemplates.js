import {
  DATA_TEMPLATES_FETCH_SUCCESS,
  DATA_TEMPLATE_SELECTED,
  DATA_TEMPLATES_INPUT_CHANGE,
} from '../constants'

const initialState = {
  dataTemplates: [],
  selectedTemplateIndex: null,
};

const dataTemplatesBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_TEMPLATES_FETCH_SUCCESS: {
      const dataTemplates = (dt) => {
        return dt.map((currentTemplate,index)=>{
          const keys = Object.keys(currentTemplate.data);
          const values = Object.values(currentTemplate.data);
          const dataArr = keys.map((key,index)=> {
            return {
              key: key,
              value: values[index],
            }
          });
          return {
            name: currentTemplate.name,
            data: dataArr,
          }
        })
      };
      return {
        ...state,
        dataTemplates: dataTemplates(action.payload),
      }
    }
    case DATA_TEMPLATE_SELECTED: {
      return{
        ...state,
        selectedTemplateIndex: action.payload,
      }
    }
    case DATA_TEMPLATES_INPUT_CHANGE: {
      const dataTemplates = [...state.dataTemplates];
      const {name, value, index} = action.payload;
      dataTemplates[state.selectedTemplateIndex].data[index][name] = value;
      return {
        ...state,
        dataTemplates,
      }
    }
    default:
      return state
  }
};

export default dataTemplatesBuilderReducer
