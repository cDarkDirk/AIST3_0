import {connect} from 'react-redux'
import {fetchChainTemplates, updateChainTemplate} from '../api'
import {
  chainTemplateNameChanged,
  deleteChainTemplate,
  addChainTemplate,
  chainTemplateMarkerChanged,
} from '../actions'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
    chainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {tests: []},
    notifications: state.notifications,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
