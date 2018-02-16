import {connect} from 'react-redux'
import DataDirectoryPage from '../components/DataDirectoryPage'
import {
  fetchBuilderChains,
  filterDirectoryData,
} from "../api"


function mapStateToProps(state) {
  return {
    formBuilderChains: state.formBuilder.formBuilderChains || [],
    notifications: state.notifications,
    directoryData: state.dataDirectory.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuilderChains: () => dispatch(fetchBuilderChains()),
    filter: (filterData) => dispatch(filterDirectoryData(filterData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDirectoryPage)
