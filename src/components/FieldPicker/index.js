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

  errorIdx = (field, type) => {
    return field.validation ? field.validation.findIndex(error => {
      return error.errorOn === type;
    }) : -1;
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

  renderInput(field, index) {
    const {paramName, label, regEx} = field;
    let labelErrIndex = this.errorIdx(field, 'label');
    let paramErrIndex = this.errorIdx(field, 'paramName');
    return (
      !this.props.collapseFields &&
      <ListGroupItem key={index} style={{backgroundColor: '#EEE'}}>
        <Row>
          <Col md={1}>
            <Label style={{
              position: 'absolute',
              marginLeft: '1%',
              marginTop: '1%'
            }} bsSize={'large'}>
              {index + 1}
            </Label>
            <Label bsStyle="success" style={{
              position: 'absolute',
              marginLeft: '1%',
              marginTop: '20%',
            }}>
              {this.crunchLocalization(field.type)}
            </Label>
          </Col>
          <Col md={4} style={{display: 'table-cell', verticalAlign: 'middle', textAlign: 'center'}}>
            {field.validation && labelErrIndex !== -1 ?
              <FormGroup validationState={field.validation[labelErrIndex].state}>
                <InputGroup>
                  <InputGroup.Addon>Имя поля</InputGroup.Addon>
                  <FormControl value={label} placeholder='Введите имя поля'
                               onChange={this.getHandlerInputChange('label', index)} type="text"/>
                </InputGroup>
                <HelpBlock>{field.validation[labelErrIndex].message}</HelpBlock>
              </FormGroup> :
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>Имя поля</InputGroup.Addon>
                  <FormControl value={label} placeholder='Введите имя поля'
                               onChange={this.getHandlerInputChange('label', index)} type="text"/>
                </InputGroup>
              </FormGroup>
            }
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Addon>Регулярное выражение</InputGroup.Addon>
              <FormControl value={regEx} placeholder='Введите регулярное выражение'
                           onChange={this.getHandlerInputChange('regEx', index)} type="text"/>
            </InputGroup>
          </Col>
          <Col md={3}>
            {field.validation && paramErrIndex !== -1 ?
              <FormGroup validationState={field.validation[paramErrIndex].state}>
                <InputGroup>
                  <InputGroup.Addon>Имя параметра</InputGroup.Addon>
                  <FormControl value={paramName} placeholder='Введите имя параметра'
                               onChange={this.getHandlerInputChange('paramName', index)} type="text"/>
                </InputGroup>
                <HelpBlock>{field.validation[paramErrIndex].message}</HelpBlock>
              </FormGroup> :
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>Имя параметра</InputGroup.Addon>
                  <FormControl value={paramName} placeholder='Введите имя параметра'
                               onChange={this.getHandlerInputChange('paramName', index)} type="text"/>
                </InputGroup>
              </FormGroup>
            }
          </Col>
          <Col md={1}>
            <Button onClick={this.getHandlerOnFieldRemove(index)}>
              <Glyphicon glyph='glyphicon glyphicon-remove'/>
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }

  renderDropdown(field, index) {
    return !this.props.collapseFields && <DropdownRow key={index}
                                                      onChange={this.getHandlerDropdownChange(index)}
                                                      field={field}
                                                      index={index}
                                                      onDelete={this.onFieldRemoveHandler}
    />;
  };

  renderDatePicker(field, index) {
    const {paramName, label} = field;
    let labelErrIndex = this.errorIdx(field, 'label');
    let paramErrIndex = this.errorIdx(field, 'paramName');
    return (
      !this.props.collapseFields &&
      <ListGroupItem key={index} style={{backgroundColor: '#EEE'}}>
        <Row>
          <Col md={1}>
            <Label style={{
              position: 'absolute',
              marginLeft: '1%',
              marginTop: '1%'
            }} bsSize={'large'}>
              {index + 1}
            </Label>
            <Label bsStyle="warning" style={{
              position: 'absolute',
              marginLeft: '1%',
              marginTop: '20%',
            }}>
              {this.crunchLocalization(field.type)}
            </Label>
          </Col>
          <Col md={7}>
            {field.validation && labelErrIndex !== -1 ?
              <FormGroup validationState={field.validation[labelErrIndex].state}>
                <InputGroup>
                  <InputGroup.Addon>Имя поля</InputGroup.Addon>
                  <FormControl value={label} placeholder='Введите имя поля'
                               onChange={this.getHandlerInputChange('label', index)} type="text"/>
                </InputGroup>
                <HelpBlock>{field.validation[labelErrIndex].message}</HelpBlock>
              </FormGroup> :
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>Имя поля</InputGroup.Addon>
                  <FormControl value={label} placeholder='Введите имя поля'
                               onChange={this.getHandlerInputChange('label', index)} type="text"/>
                </InputGroup>
              </FormGroup>
            }
          </Col>
          <Col md={3}>
            {field.validation && paramErrIndex !== -1 ?
              <FormGroup validationState={field.validation[paramErrIndex].state}>
                <InputGroup>
                  <InputGroup.Addon>Имя параметра</InputGroup.Addon>
                  <FormControl value={paramName} placeholder='Введите имя параметра'
                               onChange={this.getHandlerInputChange('paramName', index)} type="text"/>
                </InputGroup>
                <HelpBlock>{field.validation[paramErrIndex].message}</HelpBlock>
              </FormGroup> :
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>Имя параметра</InputGroup.Addon>
                  <FormControl value={paramName} placeholder='Введите имя параметра'
                               onChange={this.getHandlerInputChange('paramName', index)} type="text"/>
                </InputGroup>
              </FormGroup>
            }
          </Col>
          <Col md={1}>
            <Button onClick={this.getHandlerOnFieldRemove(index)}>
              <Glyphicon glyph='glyphicon glyphicon-remove'/>
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  };

  renderNoForm(index) {
    return (
      <ListGroupItem key={index} bsStyle="danger">
        <Row>
          <Col md={12} style={{textAlign: 'center'}}>
            Внимаение! Данную цепочку можно будет запустить без формы.
            Если помимо этого поля были добавлены поля - они будут удалены при нажатии кнопки Submit.
            Добавление новых полей будет блокировано.
          </Col>
        </Row>
      </ListGroupItem>
    );
  }

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
        case 'NoForm': {
          return this.renderNoForm(index);
        }
        default:
          return null;
      }

    })
  }
}

export default FieldPicker
