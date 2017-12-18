import {connect} from 'react-redux'
import {fetchChainTemplate} from '../api'
import ChainEditorPage from '../components/ChainEditorPage'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchChainTemplate: () => dispatch(fetchChainTemplate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainEditorPage)
