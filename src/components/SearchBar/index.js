import React from 'react'
import {FormGroup, Glyphicon, InputGroup} from "react-bootstrap";
import Select from "react-select";

class SearchBar extends React.Component {
  render() {
    const {options,onOptionClick} = this.props;
    return(
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon><Glyphicon glyph='glyphicon glyphicon-search'/></InputGroup.Addon>
          <Select
            options={options}
            wrapperStyle={{position:'relative', zIndex:'3'}}
            placeholder={'Search here...'}
            onChange={(value) => onOptionClick(value.value)}
          />
        </InputGroup>
      </FormGroup>
    )
  }
}
export default SearchBar;
