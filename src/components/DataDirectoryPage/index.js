import React from 'react'
import {
  MenuItem,
  DropdownButton,
  Panel,
  Grid,
  Label,
} from 'react-bootstrap'
import DatePicker from "react-datepicker"
import Notifications from 'react-notification-system-redux'
import {filterDirectoryData} from '../../api'

class DataDirectoryPage extends React.Component {

  state = {
    chainIndex: null,
    inputTypeIndex: 0,
    dateTo: "",
    dateFrom: ""
  };

  setFilter = (data) => {
    const filterData = {
      ...this.state,
      ...data,
    };

    this.setState(filterData, () => {
      this.fetchData()
    });
  };
//TODO STAS
  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  fetchData(){
    const {formBuilderChains} = this.props;
    const {chainIndex, dateFrom, dateTo} = this.state;

    if (chainIndex !== null && formBuilderChains[chainIndex]) {
    const chainName=formBuilderChains[chainIndex].name;
    this.props.fetchOrdersByName(chainName, dateFrom, dateTo);}
  }

  updateFormBuilderChains(field) {
    const fieldToAdd = {
      field,
      idx: this.state.chainIndex,
    };
    this.props.addField(fieldToAdd);
  }

  changeDateFrom = (dateFrom) => {
    this.setState({dateFrom}, ()=>{this.fetchData()})
  }

  changeDateTo = (dateTo) => {
    this.setState({dateTo}, ()=>{this.fetchData()})
  }

  renderFormBody = () => {
    const {formBuilderChains} = this.props;

    return (
      <div>
      </div>
    );
  };

  render() {
    const {formBuilderChains,notifications} = this.props;
    const {chainIndex, dateFrom, dateTo} = this.state;
    const chainDropDown = [
      <DropdownButton
        id='chainSelector'
        onSelect={(chainIndex) => this.setFilter({chainIndex})}
        title={chainIndex !== null ? formBuilderChains[chainIndex].name : 'Select one...'}
        bsStyle="success"
      >
        {formBuilderChains.map((chain, index) => {
          return (
            <MenuItem active={index === chainIndex} key={index} eventKey={index}>
              {chain.name}
              &nbsp;
              {formBuilderChains[index].modified && <Label bsStyle="warning">Modified</Label>}
            </MenuItem>
          )
        })}
      </DropdownButton>,
      <span>  <DatePicker onChange={this.changeDateFrom}
                          selected={dateFrom}/></span>,
      <span>  <DatePicker onChange={this.changeDateTo}
                          selected={dateTo}/></span>
    ];

    return (
      <div>
        <Panel header={chainDropDown} footer={null} bsStyle="primary">
          <Grid fluid={true}>
            {chainIndex !== null && formBuilderChains[chainIndex] && this.renderFormBody()}
          </Grid>
        </Panel>
        <Notifications notifications={notifications}/>
      </div>
    )
  }
}

export default DataDirectoryPage
