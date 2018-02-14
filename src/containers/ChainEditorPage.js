import {connect} from 'react-redux'
import {fetchChainTemplates, updateChainTemplate} from '../api'
import {chainTemplateNameChanged, deleteChainTemplate, addChainTemplate} from '../actions'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
    chainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {tests: []},
    notifications: state.notifications,
    owner: state.dataAuthorization.paramNames.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchChainTemplates: () => dispatch(fetchChainTemplates()),
    chainTemplateNameChanged: (name) => dispatch(chainTemplateNameChanged(name)),
    deleteChainTemplate: (chainTemplate) => dispatch(deleteChainTemplate(chainTemplate)),
    addChainTemplate: (payload) => dispatch(addChainTemplate(payload)),
    updateChainTemplate: (chainTemplate) => dispatch(updateChainTemplate(chainTemplate)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
