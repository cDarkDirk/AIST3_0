import {connect} from 'react-redux'
import {fetchDataTemplates} from "../api";
import DataTemplatesBuilderPage from "../components/DataTemplatesBuilderPage";
import {setSelectedDataTemplateIndex} from "../actions";

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTemplatesBuilderPage)
