import {
    SCHEDULE_DATE_CHANGED, SCHEDULE_TIME_CHANGED
} from '../constants'

const initialState = {scheduleDate: ""}

const scheduleForm = (state = initialState, action) => {
    switch (action.type) {
        case SCHEDULE_DATE_CHANGED: {
            return {...state, scheduleDate: action.payload}
        }
        case  SCHEDULE_TIME_CHANGED: {
            return{...state, scheduleTime: action.payload}
        }
        default:
        {
            return state
        }

    }

}

export default scheduleForm
