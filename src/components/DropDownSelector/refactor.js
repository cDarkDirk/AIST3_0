import React, {Component} from 'react';
import {DropdownButton, MenuItem} from "react-bootstrap";

class DropdownList extends Component {
  render() {
    const {
      id,
      onSelect,
      selLabel = 'Select one...',
      style,
      bsStyle = 'primary',
      options = [],
      labelKey = 'name',
      selectedIndex,
    } = this.props;
    return [
        <DropdownButton
          id={id}
          onSelect={onSelect}
          title={selLabel}
          bsStyle={bsStyle}
          style={style}
        >
          {options && options.map((option, index) => {
            return (
              <MenuItem active={selectedIndex === index} key={option[labelKey] + 'MenuItem'} eventKey={index}>
                {option[labelKey]}
              </MenuItem>
            )
          })}
        </DropdownButton>
    ]
  }
}

export default DropdownList;
