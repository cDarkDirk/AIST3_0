import {connect} from 'react-redux';
import Launcher from "../components/Launcher";
import {fetchChainTemplates, getDictionaryData, getUsersGroups, submitFormTemplate} from "../api";
import {clearIdOrderAlert, standsFetchSuccess} from "../actions";

function mapStateToProps(state) {
  return{
    notifications: state.notifications,
    chains: state.chainTemplates.chainTemplates,
    orderId: state.launcher.orderId,
    stands: state.launcher.stands,
    groups: state.launcher.groups,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChainTemplates: () => dispatch(fetchChainTemplates()),
    submitFormTemplate: (params) => dispatch(submitFormTemplate(params)),
    clearIdOrderAlert: () => dispatch(clearIdOrderAlert()),
    fetchStands: () => dispatch(getDictionaryData('stands',standsFetchSuccess)),
    fetchGroups: () => dispatch(getUsersGroups()),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Launcher)

