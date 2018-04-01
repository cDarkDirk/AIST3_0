import {connect} from 'react-redux'
import {
  fetchChainTemplates,
  updateChainTemplate,
  fetchDataTemplates,
  fetchGroupsForMembers,
} from '../api'
import {
  chainTemplateNameChanged,
  deleteChainTemplate,
  addChainTemplate,
  chainTemplateMarkerChanged,
  chainSelected,
  duplicateCurrentChain,
  addDTToChain,
  addGroupToChain,
} from '../actions'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
    chainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {tests: []},
    chainSelected: state.chainTemplates.selectedChainTemplate,
    chainName: state.chainTemplates.chainNames[state.chainTemplates.selectedChainTemplate] || '',
    notifications: state.notifications,
    chainNames: state.chainTemplates.chainNames,
    owner: state.dataAuthorization.paramNames.name,
    dataTemplatesNames: state.dataTemplatesBuilderReducer.dataTemplatesNames,
    selectedGroups: state.dataTemplatesBuilderReducer.selectedGroups,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChainTemplates: () => dispatch(fetchChainTemplates()),
    chainTemplateNameChanged: (name) => dispatch(chainTemplateNameChanged(name)),
    deleteChainTemplate: (chainTemplate) => dispatch(deleteChainTemplate(chainTemplate)),
    addChainTemplate: (payload) => dispatch(addChainTemplate(payload)),
    updateChainTemplate: (chainTemplate) => dispatch(updateChainTemplate(chainTemplate)),
    chainTemplateMarkerChanged: (marker) => dispatch(chainTemplateMarkerChanged(marker)),
    onChainSelected: selectedChainTemplate => dispatch(chainSelected(selectedChainTemplate)),
    duplicate: () => dispatch(duplicateCurrentChain()),
    getAllDataTemplates: () => dispatch(fetchDataTemplates()),
    addDTToChain: (payload) => dispatch(addDTToChain(payload)),
    addGroupToChain: (payload) => dispatch(addGroupToChain(payload)),
    fetchGroupsForMembers: () => dispatch(fetchGroupsForMembers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
