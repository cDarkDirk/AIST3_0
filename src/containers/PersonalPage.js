import PersonalPage from '../components/PersonalPage'
import { groupNameChange} from "../actions";
import {updatePersonalForm} from "../api";
import {connect} from 'react-redux'

function mapStateToProps(state) {
  return {
    groupName : state.dataPersonal.groupName,
    notifications: state.notifications,
    owner: state.dataAuthorization.paramNames.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createGroupClicked : (payload) => dispatch(updatePersonalForm(payload)),
    groupNameChange : (payload) => dispatch(groupNameChange(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)
