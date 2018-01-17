import {connect} from 'react-redux'
import {onFormInputChange} from '../actions'
import Form from '../components/Form'
import {fetchFormTemplate} from '../api'

function mapStateToProps(state, ownProps) {
    return {
        formTemplate: state.formTemplate,
        formValues: state.form[ownProps.formName] || {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFormInputChange: (value, paramName, formName) => dispatch(onFormInputChange(value, paramName, formName)),
        fetchFormTemplate: (formName) => dispatch(fetchFormTemplate(formName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
