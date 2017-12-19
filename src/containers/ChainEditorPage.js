import {connect} from 'react-redux'
import {fetchChainTemplates} from '../api'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchChainTemplates: () => dispatch(fetchChainTemplates())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
