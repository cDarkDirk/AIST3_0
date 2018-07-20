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
  HelpBlock,
  Label,
} from "react-bootstrap"
import 'react-select/dist/react-select.css'
import Select from 'react-select'
import './style.css';

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

  crunchLocalization = (fieldType) => {
    switch (fieldType) {
      case 'Input' : {
        return 'Текстовое поле';
      }
      case 'DropDown' : {
        return 'Выпадющее меню';
      }
      case 'DatePicker' : {
        return 'Дата';
      }
      case 'NoForm' : {
        return 'Без формы';
      }
    }
  };

  render() {
    const {index, field, field: {label, paramName}} = this.props;

    let errorIdx = (type) => {
      return field.validation ? field.validation.findIndex(error => {
        return error.errorOn === type;
      }) : -1;
    };

    const labelErrIdx = errorIdx('label');
    const paramNameErrIdx = errorIdx('paramName');

    return (
      <ListGroupItem style={{backgroundColor: '#EEE'}}>
        <Row>
          <Col md={1}>
            <Label style={{
              position: 'absolute',
              marginLeft: '1%',
              marginTop: '1%'
            }} bsSize={'large'}>
              {index + 1}
            </Label>
            <Label bsStyle="info" style={{
              position: 'absolute',
              marginLeft: '1%',
              marginTop: '20%',
            }}>
              {this.crunchLocalization(field.type)}
            </Label>
          </Col>
          <Col md={4}>
            {field.validation && labelErrIdx !== -1 ?
              <FormGroup validationState={field.validation[labelErrIdx].state}>
                <InputGroup>
                  <InputGroup.Addon>Имя поля</InputGroup.Addon>
                  <FormControl value={label} placeholder='Введите имя поля' onChange={this.handleInputChange('label')}
                               type="text"/>
                </InputGroup>
                <HelpBlock>{field.validation[labelErrIdx].message}</HelpBlock>
              </FormGroup> :
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>Имя поля</InputGroup.Addon>
                  <FormControl value={label} placeholder='Введите имя поля' onChange={this.handleInputChange('label')}
                               type="text"/>
                </InputGroup>
              </FormGroup>
            }
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Addon>Список опций</InputGroup.Addon>

              <Select.Creatable
                multi={true}
                options={field.dropDownOptions.map((name) => ({
                  label: name,
                  value: name,
                }))}
                menuStyle={{display: 'none'}}
                arrowRenderer={() => null}
                placeholder='Введите опции для списка'
                clearable={false}
                autosize={false}
                inputProps={{fixcaret: 'fixcaret'}}
                onChange={this.handleOnChangeDropdown}
                value={field.dropDownOptions}
                style={{borderRadius: '0 4px 4px 0'}}
                shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                promptTextCreator={name => name}
                noResultsText={'Результаты не найдены'}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            {field.validation && paramNameErrIdx !== -1 ?
              <FormGroup validationState={field.validation[paramNameErrIdx].state}>
                <InputGroup>
                  <InputGroup.Addon>Имя параметра</InputGroup.Addon>
                  <FormControl value={paramName} placeholder='Введите имя параметра'
                               onChange={this.handleInputChange('paramName')} type="text"/>
                </InputGroup>
                <HelpBlock>{field.validation[paramNameErrIdx].message}</HelpBlock>
              </FormGroup> :
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>Имя параметра</InputGroup.Addon>
                  <FormControl value={paramName} placeholder='Введите имя параметра'
                               onChange={this.handleInputChange('paramName')} type="text"/>
                </InputGroup>
              </FormGroup>
            }
          </Col>
          <Col md={1}>
            <Button onClick={this.handleRemoveField(index)}>
              <Glyphicon glyph='glyphicon glyphicon-remove'/>
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    )
  }
}

export default DropdownRow
