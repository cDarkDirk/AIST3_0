import {connect} from 'react-redux'
import {onFormInputChange} from '../actions'
import Form from '../components/Form'
import {fetchFormTemplate, submitFormTemplate} from '../api'

function mapStateToProps(state, ownProps) {
    return {
        formTemplate: state.formTemplate,
        formValues: state.form[ownProps.formName] || {},
        scheduler:  state.scheduleForm,
        choosenDataTemplates: state.dataTemplate.choosenDataTemplates
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFormInputChange: (value, paramName, formName) => dispatch(onFormInputChange(value, paramName, formName)),
        fetchFormTemplate: (formName) => dispatch(fetchFormTemplate(formName)),
        submit: (formName, formTemplate, scheduler, choosenDataTemplates) =>
          dispatch(submitFormTemplate(formName, formTemplate, scheduler, choosenDataTemplates)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
