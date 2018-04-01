import { LOGIN_BUTTON_CLICKED, LOGIN_PASSWORD_CHANGE} from "../constants";


const initialState = {
  paramNames: {
    name :"",
    password : "",
  },
  token: "",
};

const dataAuthorization = (state = initialState, action) => {
  switch (action.type){
    case LOGIN_BUTTON_CLICKED:
    {

      return{...state}
    }
    case LOGIN_PASSWORD_CHANGE:
    {
      const paramNames = {...state.paramNames};
      if (action.payload.key === "name"){
        paramNames.name = action.payload.value;
      }
      else {
        paramNames.password = action.payload.value;
      }
      return { ...state, paramNames }
    }
    default: return state
  }
};

export default dataAuthorization
