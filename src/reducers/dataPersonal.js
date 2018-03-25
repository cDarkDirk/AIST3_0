import {CREATE_GROUP_CLICKED, FORM_GROUPS_FETCH_SUCCEED, GROUP_NAME_CHANGE, GROUP_SELECTED} from "../constants";

const initialState = {
  groupName: "",
  selectedForm: null,
  formBuilderGroups: []
};

const dataPersonal = (state = initialState, action) => {
  switch(action.type){
    case GROUP_NAME_CHANGE:{
      const groupName = {...state};
      if (action.payload.key === "groupName"){
        groupName.groupName = action.payload.value;

      }
      return {...state,groupName}

    }
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
      return {
        ...state,
        formBuilderGroups: action.payload
      }

    }

    default: return state
  }
};
export default dataPersonal;
