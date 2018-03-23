import {connect} from 'react-redux';
import Launcher from "../components/Launcher";
import {fetchChainTemplates} from "../api";
import {launcherChainSelected} from "../actions";

function mapStateToProps(state) {
  return{
    notifications: state.notifications,
    chains: state.chainTemplates.chainTemplates,
    selectedChain: state.launcher.selectedChain,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChainTemplates: () => dispatch(fetchChainTemplates()),
    chainSelected: (index) => dispatch(launcherChainSelected(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Launcher)

