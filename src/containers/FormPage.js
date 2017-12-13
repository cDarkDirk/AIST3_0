import {connect} from 'react-redux'
import {onFormInputChange} from '../actions'
import FormPage from '../components/FormPage'

function mapStateToProps(state) {
    return {
        counter: state.ui.counter,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFormInputChange: (value, keyName, formName) => dispatch(onFormInputChange(value, keyName, formName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage)
