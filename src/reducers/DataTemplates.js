import {
  DATA_TEMPLATES_FETCH_SUCCESS,
  DATA_TEMPLATE_SELECTED,
  DATA_TEMPLATES_INPUT_CHANGE,
  DATA_TEMPLATE_NAME_CHANGED,
  NEW_DATA_TEMPLATE_ADDED,
  NEW_DATA_TEMPLATE_PARAM_ADDED,
  UPDATE_DATA_TEMPLATE_SUCCESS, DATA_TEMPLATE_ADDED, FORM_GROUPS_FOR_MEMBERS_FETCH_SUCCEED,
} from '../constants'

const initialState = {
  dataTemplates: [],
  selectedTemplateIndex: null,
  dataTemplatesNames: [],
  selectedGroups:[],
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
            modified: false,
            new: false,
          }
        })
      };
      const dataTemplatesNames = dataTemplates(action.payload).map((template, index)=> template.name);
      return {
        ...state,
        dataTemplates: dataTemplates(action.payload),
        dataTemplatesNames,
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
      if (!dataTemplates[state.selectedTemplateIndex].new){
        dataTemplates[state.selectedTemplateIndex].modified = true;
      }
      return {
        ...state,
        dataTemplates,
      }
    }

    case DATA_TEMPLATE_NAME_CHANGED: {
      const dataTemplates = [...state.dataTemplates];
      dataTemplates[state.selectedTemplateIndex].name = action.payload;
      if (!dataTemplates[state.selectedTemplateIndex].new){
        dataTemplates[state.selectedTemplateIndex].modified = true;
      }
      return{
        ...state,
        dataTemplates,
      }
    }

    case NEW_DATA_TEMPLATE_ADDED: {
      const newEntry = {
        name: 'new template',
        data: [],
        modified: false,
        new: true,
      };
      return {
        ...state,
        selectedTemplateIndex: 0,
        dataTemplates: [newEntry, ...state.dataTemplates],
        dataTemplatesNames: [newEntry.name, ...state.dataTemplatesNames],
      }
    }

    case NEW_DATA_TEMPLATE_PARAM_ADDED: {
      const dataTemplates = [...state.dataTemplates];
      const newEntry = {key: 'key', value: 'value'};
      dataTemplates[state.selectedTemplateIndex].data.push(newEntry);
      if (!dataTemplates[state.selectedTemplateIndex].new){
        dataTemplates[state.selectedTemplateIndex].modified = true;
      }
      return {
        ...state,
        dataTemplates,
      }
    }

    case UPDATE_DATA_TEMPLATE_SUCCESS: {
      const dataTemplates = [...state.dataTemplates];
      dataTemplates[state.selectedTemplateIndex].modified = false;
      dataTemplates[state.selectedTemplateIndex].new = false;
      return{
        ...state,
        dataTemplates,
      }
    }

    case DATA_TEMPLATE_ADDED: {
      return {
        ...state,
        dataTemplatesNames: [...state.dataTemplatesNames],
      }
    }

    case FORM_GROUPS_FOR_MEMBERS_FETCH_SUCCEED: {
      const selectedGroups = action.payload.map((template)=> template.name);
      return {
        ...state,
        selectedGroups,
      }
    }

    default:
      return state
  }
};

export default dataTemplatesBuilderReducer
