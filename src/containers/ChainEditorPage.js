import {connect} from 'react-redux'
import {
  fetchChainTemplates,
  updateChainTemplate,
  fetchDataTemplates,
  fetchGroupsForMembers, fetchBuilderChains, filterEntityByTags,
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
  handleGroupChange, clearTestFilter, filteredTestByTagsFetchSucceed, applyTestsFilters,
  filteredTestByChainFetchSucceed, chainEditorTemplateFetchSucceed, applyChainsFilters, clearChainFilter,
} from '../actions'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
    chainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {tests: []},
    chainSelected: state.chainTemplates.selectedChainTemplate,
    chainName: state.chainTemplates.chainNames[state.chainTemplates.selectedChainTemplate] || '',
    chainMarkers: state.chainTemplates.chainMarkers,
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
    fetchBuilderChains: () => dispatch(fetchBuilderChains()),
    chainTemplateNameChanged: (name) => dispatch(chainTemplateNameChanged(name)),
    deleteChainTemplate: (chainTemplate) => dispatch(deleteChainTemplate(chainTemplate)),
    addChainTemplate: (payload) => dispatch(addChainTemplate(payload)),
    updateChainTemplate: (chainTemplate) => dispatch(updateChainTemplate(chainTemplate)),
    chainTemplateMarkerChanged: (marker) => dispatch(chainTemplateMarkerChanged(marker)),
    onChainSelected: selectedChainTemplate => dispatch(chainSelected(selectedChainTemplate)),
    duplicate: () => dispatch(duplicateCurrentChain()),
    getAllDataTemplates: () => dispatch(fetchDataTemplates()),
    addGroupToChain: (payload) => dispatch(addGroupToChain(payload)),
    addDTToChain: (payload) => dispatch(addDTToChain(payload)),
    fetchGroupsForMembers: () => dispatch(fetchGroupsForMembers()),
    clearTestFilter: () => dispatch(clearChainFilter()),
    filterTestsByTags: (tags, filters) => dispatch(filterEntityByTags(tags, 'chain_templates', chainEditorTemplateFetchSucceed, filters)),
    applyTestsFilters: (filters) => dispatch(applyChainsFilters(filters)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
