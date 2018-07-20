import React from 'react'
import {FormGroup, Glyphicon, InputGroup} from "react-bootstrap";
import Select from "react-select";

class SearchBar extends React.Component {
  render() {
    const {
      options,
      onOptionClick,
      placeholder = 'Search here...',
      ...props,
    } = this.props;
    return(
        <InputGroup className={props.className}>
          <InputGroup.Addon><Glyphicon glyph='glyphicon glyphicon-search'/></InputGroup.Addon>
          <Select
            options={options}
            wrapperStyle={{position:'relative', zIndex:'5'}}
            placeholder={placeholder}
            noResultsText={'Результаты не найдены'}
            onChange={(value) => onOptionClick(value.value)}
            style={{borderRadius:'0 4px 4px 0',position:'relative', zIndex:'5'}}
            {...props}
          />
        </InputGroup>
    )
  }
}
export default SearchBar;
