import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addCounter} from '../actions'

import Home from '../components/Home'

const mapStateToProps = state => ({
  counter: state.ui.counter,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addCounter: () => addCounter(),
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
