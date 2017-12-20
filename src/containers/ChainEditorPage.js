import {connect} from 'react-redux'
import {fetchChainTemplates} from '../api'
import {chainTemplateNameChanged, deleteChainTemplate, addChainTemplate} from '../actions'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
     chainTemplate: state.chainTemplates.chainTemplates[state.chainTemplates.selectedChainTemplate] || {tests: []}
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchChainTemplates: () => dispatch(fetchChainTemplates()),
      chainTemplateNameChanged: (name) => dispatch(chainTemplateNameChanged(name)),
      deleteChainTemplate: (chainTemplate) => dispatch(deleteChainTemplate(chainTemplate)),
      addChainTemplate: () => dispatch(addChainTemplate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
