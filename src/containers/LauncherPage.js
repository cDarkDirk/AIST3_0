import {connect} from 'react-redux'

import LauncherPage from '../components/LauncherPage'
import {selectChainForm} from "../actions";
import {fetchBuilderChains} from "../api";

function mapStateToProps(state) {
  return {
    launcher: state.launcher,
    formBuilderChains: state.formBuilder.formBuilderChains || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectChainForm: (chainName) => dispatch(selectChainForm(chainName)),
    fetchBuilderChains: () => dispatch(fetchBuilderChains()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LauncherPage)
