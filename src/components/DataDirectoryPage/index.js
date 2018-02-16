import React from 'react';
import {
  MenuItem,
  DropdownButton,
  Panel,
  Grid,
  Label,
} from 'react-bootstrap';
import Notifications from 'react-notification-system-redux'

import {filterDirectoryData} from '../../api';

class DataDirectoryPage extends React.Component {

  state = {
    chainIndex: null,
    inputTypeIndex: 0,
  };

  setFilter = (data) => {
    const filterData = {
      ...this.state,
      ...data,
    };

    this.setState(filterData, () => {
      filterDirectoryData(filterData);
    });
  };
//TODO STAS
  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  updateFormBuilderChains(field) {
    const fieldToAdd = {
      field,
      idx: this.state.chainIndex,
    };
    this.props.addField(fieldToAdd);
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
    const {chainIndex} = this.state;
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
      </DropdownButton>
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
