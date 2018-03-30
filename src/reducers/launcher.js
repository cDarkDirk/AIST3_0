import {
  ORDER_CREATED,
  CLEAR_ID_ORDER_ALERT,
  LAUNCHER_STANDS_FETCH_SUCCEED,
  LAUNCHER_USER_GROUPS_FETCH_SUCCEED,
} from "../constants";

const initialState = {
  selectedForm: null,
  formName: null,
  orderId: null,
  stands: [],
  groups: [],
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

    case LAUNCHER_STANDS_FETCH_SUCCEED: {
      return {
        ...state,
        stands: action.stands,
      }
    }

    case LAUNCHER_USER_GROUPS_FETCH_SUCCEED: {
      return {
        ...state,
        groups: action.groups,
      }
    }

    default:
      return state
  }
};

export default launcher;
