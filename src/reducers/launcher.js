import {ORDER_CREATED, CLEAR_ID_ORDER_ALERT} from "../constants";

const initialState = {
  selectedForm: null,
  formName: null,
  orderId: null,
};

const launcher = (state = initialState, action) => {
  switch (action.type) {

    case ORDER_CREATED: {
      return {
        ...state,
        orderId: action.id,
      }
    }

    case CLEAR_ID_ORDER_ALERT: {
      return {
        ...state,
        orderId: null,
      }
    }

    default:
      return state
  }
};

export default launcher;
