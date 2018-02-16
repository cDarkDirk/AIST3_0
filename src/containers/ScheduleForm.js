import {connect} from 'react-redux'
import {changeDate} from '../actions'
import {changeTime} from '../actions'
import {changeAmountOfTimes} from "../actions"
import ScheduleForm from '../components/ScheduleForm'


function mapStateToProps(state) {
  return {
    date: state.scheduleForm.scheduleDate,
    time: state.scheduleForm.scheduleTime,
    amountOfTimes: state.scheduleForm.amountOfTimes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeDate: (date) => dispatch(changeDate(date)),
    changeTime: (time) => dispatch(changeTime(time)),
    changeAmountOfTimes: (value) => dispatch(changeAmountOfTimes(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm)
