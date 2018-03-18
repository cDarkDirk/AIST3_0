import {CREATE_GROUP_CLICKED, GROUP_NAME_CHANGE} from "../constants";

const initialState = {
  groupName: ""
};

const dataPersonal = (state = initialState, action) => {
  switch(action.type){
    case GROUP_NAME_CHANGE:{
      const groupName = {...state}
      if (action.payload.key === "groupName"){
        groupName.groupName = action.payload.value;;

      }
      return {...state,groupName}

    }
    case CREATE_GROUP_CLICKED:{
      return{...state}
    }
    default: return state
  }
};
export default dataPersonal;
