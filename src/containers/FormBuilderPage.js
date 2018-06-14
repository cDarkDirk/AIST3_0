import {connect} from 'react-redux'
import FormBuilderPage from '../components/FormBuilderPage'
import {fetchBuilderChains, updateChainForm, validateForm} from "../api"
import {
  newFieldAdded,
  onFieldsValuesUpdate,
  fieldWasRemoved,
} from "../actions"
import {removeAll} from "react-notification-system-redux";

function mapStateToProps(state) {
  return {
    formBuilderChains: state.formBuilder.formBuilderChains || [],
    notifications: state.notifications,
    owner: state.dataAuthorization.paramNames.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilderChains: () => dispatch(fetchBuilderChains()),
    addField: (field) => dispatch(newFieldAdded(field)),
    updateFieldsValues: (some) => dispatch(onFieldsValuesUpdate(some)),
    submit: (name, fields, idx) => dispatch(validateForm(name, fields, idx)),
    removeField: (result) => dispatch(fieldWasRemoved(result)),
    clearNotifications: () => dispatch(removeAll()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilderPage)
