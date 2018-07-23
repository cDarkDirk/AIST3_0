import React, {Component} from 'react';
import InputGroup from "react-bootstrap/es/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";

export default ({label, value, placeholder, onChange}) => {
  return (
    <InputGroup>
      <InputGroup.Addon>{label}</InputGroup.Addon>
      <FormControl value={value}
                   style={{zIndex: '0', position: 'relative'}}
                   placeholder={placeholder}
                   onChange={onChange}
                   type="text"/>
    </InputGroup>
  );
};
