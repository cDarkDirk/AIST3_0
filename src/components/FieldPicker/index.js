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
  Modal,
} from "react-bootstrap"
import DropdownRow from "./DropdownRow"

class FieldPicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show1: false
    };
  }

  handleClose() {
    this.setState({show1: false});
  }

  handleShow() {
    this.setState({show1: true});
  }

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
    let regExErrIndex = this.errorIdx(field, 'regEx');
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
          <Col md={3} style={{display: 'table-cell', verticalAlign: 'middle', textAlign: 'center'}}>
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

          <Col md={4}>
            <Button className="pull-right" style={{marginRight: '1%'}} onClick={this.handleShow}>
              <Glyphicon glyph='glyphicon glyphicon-question-sign'/>
            </Button>
            {field.validation && regExErrIndex !== -1 ?
              <FormGroup validationState={field.validation[regExErrIndex].state}>
                <InputGroup>
                  <InputGroup.Addon>Рег. выражение</InputGroup.Addon>
                  <FormControl value={regEx} placeholder='Введите регулярное выражение'
                               onChange={this.getHandlerInputChange('regEx', index)} type="text"/>
                </InputGroup>
                <HelpBlock>{field.validation[regExErrIndex].message}</HelpBlock>
              </FormGroup> :
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>Рег. выражение</InputGroup.Addon>
                  <FormControl value={regEx} placeholder='Введите регулярное выражение'
                               onChange={this.getHandlerInputChange('regEx', index)} type="text"/>
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
        <Modal show={this.state.show1} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><strong>Конструктор регулярного выражения</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Чтобы корректно задать регулярное выражение, необходимо:</p>
            <li type="square">Первым символом в строке должен быть / </li>
            <li type="square">В конце строки должен быть символ /, однако после него допустимы некоторые встроенные сокращения</li>
            <p> </p>
            <p>У регулярных выражений есть свои встроенные сокращения:</p>
            <li type="square">\d Любая цифра</li>
            <li type="square">\w Алфавитно-цифровой символ</li>
            <li type="square">\s Пробельный символ (пробел, табуляция, перевод строки, и т.п.)</li>
            <li type="square">\D не цифра</li>
            <li type="square">\W не алфавитно-цифровой символ</li>
            <li type="square">\S не пробельный символ</li>
            <li type="square">. любой символ, кроме перевода строки</li>
            <p> </p>
            <p>Наиболее распространенные примеры регулярных выражений:</p>
            <li type="square">Почта - /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]&#123;2,4&#125;/igm</li>
            <li type="square">ИНН - /^\d&#123;10&#125;&amp;/</li>
            <li type="square">Номер телефона - /^\d&#123;1&#125;-\d&#123;3&#125;-\d&#123;7&#125;&amp;/</li>
            <li type="square">ФИО - /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/</li>
            <p> </p>
            <p>Для проверки корректности своих регулярных выражений можно использовать сайт https://regex101.com/</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
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
