import {connect} from 'react-redux'
import DataDirectoryPage from '../components/DataDirectoryPage'
import {
  fetchBuilderChains,
  filterDirectoryData,
  fetchOrdersByName,
  getCSVbyOrderID,
  updateOrderRerun
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
    fetchOrdersByName:(chainName, dateFrom, dateTo) => dispatch (fetchOrdersByName(chainName, dateFrom, dateTo)),
    getCSVbyOrderID: (orderID) => dispatch(getCSVbyOrderID(orderID)),
    updateOrderRerun: (orderID) => dispatch(updateOrderRerun(orderID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDirectoryPage)
