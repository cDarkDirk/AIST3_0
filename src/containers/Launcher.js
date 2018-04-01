import {connect} from 'react-redux';
import Launcher from "../components/Launcher";
import {fetchChainTemplates, submitFormTemplate} from "../api";

function mapStateToProps(state) {
  return{
    notifications: state.notifications,
    chains: state.chainTemplates.chainTemplates,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChainTemplates: () => dispatch(fetchChainTemplates()),
    submitFormTemplate: (params) => dispatch(submitFormTemplate(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Launcher)

