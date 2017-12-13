import {connect} from 'react-redux'
import {onFormInputChange} from '../actions'
import FormPage from '../components/FormPage'
import {fetchFormTemplate} from '../api'

function mapStateToProps(state) {
    return {
        formTemplate: state.formTemplate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFormInputChange: (value, paramName, formName) => dispatch(onFormInputChange(value, paramName, formName)),
        fetchFormTemplate: (formName) => dispatch(fetchFormTemplate(formName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage)
