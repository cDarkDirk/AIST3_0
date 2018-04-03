import {
  CREATE_GROUP_CLICKED,
  FORM_GROUPS_FETCH_SUCCEED,
  GROUP_SELECTED,
  } from "../constants";

const initialState = {
  selectedForm: null,
  formBuilderGroups: [],
  membersTemplates: [],
};

const dataPersonal = (state = initialState, action) => {
  switch(action.type){
    case CREATE_GROUP_CLICKED:{
      return{...state}
    }
    case GROUP_SELECTED: {
      return {
        ...state,
        selectedForm: action.payload.index,
      }
    }
    case FORM_GROUPS_FETCH_SUCCEED:{
      const membersTemplates = action.payload.map((owners) => {
        if (owners.members) owners['members'] = owners.members.map(index => {
          return{label: index, value: index};
        });
        return owners;
      });
      return {
        ...state,
        membersTemplates,
        formBuilderGroups: action.payload
      }

    }

    default: return state
  }
};
export default dataPersonal;
