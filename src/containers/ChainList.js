import {connect} from 'react-redux'

import ChainList from '../components/ChainList'
import {chainSelected} from "../actions";

function mapStateToProps(state) {

    return {
      chainTemplates: state.chainTemplates.chainTemplates,
      selectedChainTemplate: state.chainTemplates.selectedChainTemplate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chainSelected: selectedChain => dispatch(chainSelected(selectedChain))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainList)
