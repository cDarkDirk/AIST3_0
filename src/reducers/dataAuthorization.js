import { LOGIN_BUTTON_CLICKED, LOGIN_PASSWORD_CHANGE} from "../constants";
import dataTemplate from "./dataTemplate";


const initialState = {
  paramNames: {},
};

const dataAuthorization = (state = initialState, action) => {
  switch (action.type){
    case LOGIN_BUTTON_CLICKED:
    {
      return{...state}
    }
    case LOGIN_PASSWORD_CHANGE:
    {
      return {...state, paramNames: action.payload}
    }
    default: return state
  }
}

export default dataAuthorization
