import {connect} from 'react-redux'
import {fetchDataTemplates, validateDTBSubmitValue} from "../api";
import DataTemplatesBuilderPage from "../components/DataTemplatesBuilderPage";
import {
  setSelectedDataTemplateIndex,
  dataTemplatesInputChange,
  dataTemplateNameChanged,
  newDataTemplateAdded,
  newDataTemplateParamAdded,
} from "../actions";

function mapStateToProps(state) {
  return {
    dataTemplates: state.dataTemplatesBuilderReducer.dataTemplates || [],
    selectedTemplateIndex: state.dataTemplatesBuilderReducer.selectedTemplateIndex,
    notifications: state.notifications,
    dataTemplatesNames: state.dataTemplatesBuilderReducer.dataTemplatesNames,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDataTemplates: () => dispatch(fetchDataTemplates()),
    onTemplateSelected: (index) => dispatch(setSelectedDataTemplateIndex(index)),
    onDataTemplatesInputChange: (newValue, index) => dispatch(dataTemplatesInputChange(newValue, index)),
    templateNameChanged: (newName) => dispatch(dataTemplateNameChanged(newName)),
    addNewTemplate: () => dispatch(newDataTemplateAdded()),
    addNewParam: () => dispatch(newDataTemplateParamAdded()),
    sumbitTemplate: (data) => dispatch(validateDTBSubmitValue(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTemplatesBuilderPage)
