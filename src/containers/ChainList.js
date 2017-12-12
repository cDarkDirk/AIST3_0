import {connect} from 'react-redux'

import ChainList from '../components/ChainList'
import {chainSelected} from "../actions";

function mapStateToProps(state) {

    return {selectedChain: state.ui.selectedChain}
}

function mapDispatchToProps(dispatch) {
    return {
        chainSelected: selectedChain => dispatch(chainSelected(selectedChain))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainList)
