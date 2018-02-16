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
import 'react-select/dist/react-select.css'
import Select from 'react-select'

class DropdownRow extends React.Component {
  componentWillMount() {
    this.setState({
      optionInput: '',
    });
  }

  handleInputChange = (name) => {
    return (event) => {
      const {onChange, field} = this.props;
      const updatedField = {...field};
      updatedField[name] = event.target.value;
      onChange(updatedField);
    }
  };

  handleOnChangeDropdown = (options) => {
    const {onChange, field} = this.props;
    const updatedDDOptions = {...field};
    updatedDDOptions.dropDownOptions = options.map((option) => option.value);
    onChange(updatedDDOptions);
  };

  handleRemoveField = (index) => {
    return () => {
      const {onDelete} = this.props;
      onDelete(index);
    }
  };

  render() {
    const {index, field, field: {label, paramName}} = this.props;

    return (
      <ListGroupItem bsStyle="info">
        <FormGroup>
          <Row>
            <Col md={1}><b>{index + 1}</b></Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Addon>Label</InputGroup.Addon>
                <FormControl value={label} onChange={this.handleInputChange('label')} type="text"/>
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Addon>Option</InputGroup.Addon>

                <Select.Creatable
                  multi={true}
                  options={field.dropDownOptions.map((name) => ({
                    label: name,
                    value: name,
                  }))}
                  menuStyle={{display: 'none'}}
                  arrowRenderer={null}
                  clearable={false}
                  autosize={false}
                  onChange={this.handleOnChangeDropdown}
                  value={field.dropDownOptions}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Addon>Parameter name</InputGroup.Addon>
                <FormControl value={paramName} onChange={this.handleInputChange('paramName')} type="text"/>
              </InputGroup>
            </Col>
            <Col md={1}>
              <Button onClick={this.handleRemoveField(index)}>
                <Glyphicon glyph='glyphicon glyphicon-remove'/>
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </ListGroupItem>
    )
  }
}

export default DropdownRow
