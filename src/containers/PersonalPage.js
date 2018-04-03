import PersonalPage from '../components/PersonalPage'
import {selectGroupForm} from "../actions";
import {
  fetchGroups,
  fetchGroupsForMembers,
  submitFormMembers,
  updatePersonalForm,
} from "../api";
import {connect} from 'react-redux'

function mapStateToProps(state) {
  return {
    dataPersonal : state.dataPersonal,
    formBuilderGroups: state.dataPersonal.formBuilderGroups || [],
    groupName : state.dataPersonal.groupName,
    notifications: state.notifications,
    owner: state.dataAuthorization.paramNames.name,
    membersTemplates : state.dataPersonal.membersTemplates,
    selectedGroups: state.dataTemplatesBuilderReducer.selectedGroups,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createGroupClicked : (payload) => dispatch(updatePersonalForm(payload)),
    selectGroupForm: (GroupName) => dispatch(selectGroupForm(GroupName)),
    submitFormMembers : (param) => dispatch(submitFormMembers(param)),
    fetchGroupsForMembers: () => dispatch(fetchGroupsForMembers()),
    fetchGroups: () => dispatch(fetchGroups()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)
