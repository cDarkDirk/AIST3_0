import {connect} from 'react-redux'
import {changeDate} from '../actions'
import {changeTime} from '../actions'
import ScheduleForm from  '../components/ScheduleForm'



function mapStateToProps(state) {
    return {
        date: state.scheduleForm.scheduleDate,
        time: state.scheduleForm.scheduleTime
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeDate: (date) => dispatch(changeDate(date)),
        changeTime: (time) => dispatch(changeTime(time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm)
