import {connect} from 'react-redux'
import {fetchChainEditorTemplate} from '../api'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
      chainTemplates: state.chainTemplates
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchChainEditorTemplate: () => dispatch(fetchChainEditorTemplate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
