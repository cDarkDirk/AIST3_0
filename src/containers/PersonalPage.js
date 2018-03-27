import PersonalPage from '../components/PersonalPage'
import {groupNameChange, selectGroupForm} from "../actions";
import {fetchGroups, updatePersonalForm} from "../api";
import {connect} from 'react-redux'

function mapStateToProps(state) {
  return {
    dataPersonal : state.dataPersonal,
    formBuilderGroups: state.dataPersonal.formBuilderGroups || [],
    groupName : state.dataPersonal.groupName,
    notifications: state.notifications,
    owner: state.dataAuthorization.paramNames.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createGroupClicked : (payload) => dispatch(updatePersonalForm(payload)),
    groupNameChange : (payload) => dispatch(groupNameChange(payload)),
    selectGroupForm: (GroupName) => dispatch(selectGroupForm(GroupName)),
    fetchGroups: () => dispatch(fetchGroups()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)
