import {
  SCHEDULE_DATE_CHANGED,
  SCHEDULE_TIME_CHANGED,
  SCHEDULE_AMOUNT_OF_TIMES_CHANGED,
} from '../constants'

const initialState = {amountOfTimes: "1"};

const scheduleForm = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULE_DATE_CHANGED: {
      return {...state, scheduleDate: action.payload}
    }
    case  SCHEDULE_TIME_CHANGED: {
      return {...state, scheduleTime: action.payload}
    }
    case SCHEDULE_AMOUNT_OF_TIMES_CHANGED: {
      return {...state, amountOfTimes: action.payload}
    }
    default: {
      return state
    }

  }

};

export default scheduleForm
