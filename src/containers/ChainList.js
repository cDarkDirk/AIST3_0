import {connect} from 'react-redux'

import ChainList from '../components/ChainList'
import {chainSelected} from "../actions"

function mapStateToProps(state) {

    return {
      chainTemplates: state.chainTemplates.chainTemplates,
      selectedChainTemplate: state.chainTemplates.selectedChainTemplate,
      chainNames: state.chainTemplates.chainNames,
      chainNamesForDropdown : state.chainTemplates.chainNamesForDropdown,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chainSelected: selectedChainTemplate => dispatch(chainSelected(selectedChainTemplate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainList)
