import {connect} from 'react-redux'
import {fetchDataTemplates} from "../api";
import DataTemplatesBuilderPage from "../components/DataTemplatesBuilderPage";
import {setSelectedDataTemplateIndex, dataTemplatesInputChange} from "../actions";

function mapStateToProps(state) {
  return {
    dataTemplates: state.dataTemplatesBuilderReducer.dataTemplates || [],
    selectedTemplateIndex: state.dataTemplatesBuilderReducer.selectedTemplateIndex,
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDataTemplates: () => dispatch(fetchDataTemplates()),
    onTemplateSelected: (index)=> dispatch(setSelectedDataTemplateIndex(index)),
    onDataTemplatesInputChange: (newValue, index) => dispatch(dataTemplatesInputChange(newValue, index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTemplatesBuilderPage)
