import React from 'react';
import {
  MenuItem,
  DropdownButton,
  Label
} from 'react-bootstrap';

class DropDownSelector extends React.Component {

  render() {
    const {id, onSelect, dropOptions, selectedIndex = null, bsStyle="success"}=this.props;
    const selectedValue = selectedIndex !== null ? dropOptions[selectedIndex] : null;
    return [
      <DropdownButton
        id={id}
        onSelect={onSelect}
        title={selectedValue ? selectedValue.label : 'Select one...'}
        bsStyle={bsStyle}
      >
        {dropOptions.map((option, index) => {
          return (
            <MenuItem active={selectedIndex === index} key={index} eventKey={index}>
              {option.label}
              &nbsp;
              {option.modified && <Label bsStyle="warning">Modified</Label>}
            </MenuItem>
          )
        })}
      </DropdownButton>,
      <span style={{marginLeft: '20px'}}>
        {selectedIndex !== null &&
        selectedValue.modified &&
        <Label bsStyle="warning">Modified</Label>}
        </span>]
  }
}

export default DropDownSelector
