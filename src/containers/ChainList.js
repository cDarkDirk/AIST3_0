import {connect} from 'react-redux'

import ChainList from '../components/ChainList'
import {selectChainTemplate} from "../actions";

function mapStateToProps(state) {

    return {
      chainTemplates: state.chainTemplates.chainTemplates,
      selectedChainTemplate: state.chainTemplates.selectedChainTemplate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectChainTemplate: selectedChainTemplate => dispatch(selectChainTemplate(selectedChainTemplate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainList)
