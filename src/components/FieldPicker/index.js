import React from 'react'
import {
  ListGroupItem,
  Row,
  FormGroup,
  Col,
  InputGroup,
  FormControl,
  Button,
  Glyphicon,
} from "react-bootstrap"
import DropdownRow from "./DropdownRow"

class FieldPicker extends React.Component {

  getHandlerInputChange(name, index) {
    return (event) => {
      const {onChange, fields} = this.props;
      const updatedFields = [...fields];
      updatedFields[index][name] = event.target.value;
      onChange(updatedFields);
    }
  }

  getHandlerOnFieldRemove = (index) => {
    return () => {
      this.props.onFieldRemove(index);
    }
  };

  onFieldRemoveHandler = (ind) => {
    this.props.onFieldRemove(ind);
  };

  getHandlerDropdownChange(index) {
    return (field) => {
      const {onChange, fields} = this.props;
      const updatedFields = [...fields];
      updatedFields[index] = field;
      onChange(updatedFields);
    }
  }

  renderInput(field, index) {
    const {paramName, label, regEx} = field;
    return (
      <ListGroupItem key={index} bsStyle="success">
        <FormGroup>
          <Row>
            <Col md={1}><b>{index + 1}</b></Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Addon>Label</InputGroup.Addon>
                <FormControl value={label} onChange={this.getHandlerInputChange('label', index)} type="text"/>
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Addon>RegEx</InputGroup.Addon>
                <FormControl value={regEx} onChange={this.getHandlerInputChange('regEx', index)} type="text"/>
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Addon>Parameter name</InputGroup.Addon>
                <FormControl value={paramName} onChange={this.getHandlerInputChange('paramName', index)} type="text"/>
              </InputGroup>
            </Col>
            <Col md={1}>
              <Button onClick={this.getHandlerOnFieldRemove(index)}>
                <Glyphicon glyph='glyphicon glyphicon-remove'/>
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </ListGroupItem>
    );
  }

  renderDropdown(field, index) {
    return <DropdownRow key={index}
                        onChange={this.getHandlerDropdownChange(index)}
                        field={field}
                        index={index}
                        onDelete={this.onFieldRemoveHandler}
    />;
  };

  renderDatePicker(field, index) {
    const {paramName, label} = field;

    return (
      <ListGroupItem key={index} bsStyle="warning" style={{maxWidth: '1275px'}}>
        <Row>
          <FormGroup>
            <Col md={1}><b>{index + 1}</b></Col>
            <Col md={7}>
              <InputGroup>
                <InputGroup.Addon>Label</InputGroup.Addon>
                <FormControl value={label} onChange={this.getHandlerInputChange('label', index)} type="text"/>
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Addon>Parameter name</InputGroup.Addon>
                <FormControl value={paramName} onChange={this.getHandlerInputChange('paramName', index)} type="text"/>
              </InputGroup>
            </Col>
            <Col md={1}>
              <Button onClick={this.getHandlerOnFieldRemove(index)}>
                <Glyphicon glyph='glyphicon glyphicon-remove'/>
              </Button>
            </Col>
          </FormGroup>
        </Row>
      </ListGroupItem>
    );
  };

  render() {
    const {fields} = this.props;
    return fields.map((field, index) => {
      switch (field.type) {
        case 'Input': {
          return this.renderInput(field, index);
        }
        case 'DropDown': {
          return this.renderDropdown(field, index);
        }
        case 'DatePicker': {
          return this.renderDatePicker(field, index);
        }
        default:
          return null;
      }

    })
  }
}

export default FieldPicker
