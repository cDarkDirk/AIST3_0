import {connect} from 'react-redux'
import {onTemplateFormInputChange} from '../actions'
import TemplateForm from '../components/TemplateForm'
import {fetchDataTemplatesList} from '../api'

function mapStateToProps(state, ownProps) {
  return {
    dataTemplates: state.dataTemplate.dataTemplates,
    choosenDataTemplates: state.dataTemplate.choosenDataTemplates,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onTemplateFormInputChange: (value, paramName, formName) => dispatch(onTemplateFormInputChange(value, paramName, formName)),
    fetchDataTemplatesList: () => dispatch(fetchDataTemplatesList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm)
