import {connect} from 'react-redux'
import {
  fetchChainTemplates,
  updateChainTemplate,
} from '../api'
import {
  chainTemplateNameChanged,
  deleteChainTemplate,
  addChainTemplate,
  chainTemplateMarkerChanged,
  chainSelected,
  duplicateCurrentChain,
} from '../actions'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
    chainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {tests: []},
    chainSelected: state.chainTemplates.selectedChainTemplate,
    chainName: state.chainTemplates.chainNames[state.chainTemplates.selectedChainTemplate] || '',
    notifications: state.notifications,
    chainNames: state.chainTemplates.chainNames,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChainTemplates: () => dispatch(fetchChainTemplates()),
    chainTemplateNameChanged: (name) => dispatch(chainTemplateNameChanged(name)),
    deleteChainTemplate: (chainTemplate) => dispatch(deleteChainTemplate(chainTemplate)),
    addChainTemplate: () => dispatch(addChainTemplate()),
    updateChainTemplate: (chainTemplate) => dispatch(updateChainTemplate(chainTemplate)),
    chainTemplateMarkerChanged: (marker) => dispatch(chainTemplateMarkerChanged(marker)),
    onChainSelected: selectedChainTemplate => dispatch(chainSelected(selectedChainTemplate)),
    duplicate: () => dispatch(duplicateCurrentChain()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
