import React, {Component} from 'react';
import {
  Button,
  MenuItem,
  DropdownButton,
  Panel,
  Form,
  ListGroup,
  Grid,
  ButtonGroup,
  Glyphicon,
  Label,
  Modal,
  Row,
  Col,
  Checkbox,
  Alert,
} from 'react-bootstrap';
import Select from 'react-select';
import Notifications from 'react-notification-system-redux'
import FieldPicker from "../FieldPicker";
import Header from "../Header";
import {forceLogin} from '../../globalFunc';
import './style.css';

class FormBuilderPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.clearNotifications();
    this.props.fetchBuilderChains();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    forceLogin();

    this.state = {
      noFormChecked: false,
      chainIndex: null,
      show: false,
      inputTypeIndex: 0,
      inputTypes: [
        'Input',
        'DropDown',
        'DatePicker',
      ],
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  componentWillUpdate(nextProps, prevProps) {
    const {formBuilderChains, match: {params: {chainIndex}}} = nextProps;
    if (chainIndex && formBuilderChains.length > 0 && chainIndex !== prevProps.chainIndex) {
      console.log(formBuilderChains);
      if (formBuilderChains[chainIndex].fields.findIndex(field => {
          return field.type === 'NoForm';
        }) === -1) {
        this.setState({chainIndex: chainIndex, noFormChecked: false});
      } else {
        this.setState({chainIndex: chainIndex, noFormChecked: true});
      }
    }
  }

  onChainSelected = (chain) => {
    if (this.props.formBuilderChains[chain.value].fields.findIndex(field => {
      return field.type === 'NoForm';
    }) === -1) {
      this.setState({chainIndex: chain.value, noFormChecked: false});
      window.location.hash = '#/formbuilder/' + chain.value;
    } else {
      this.setState({chainIndex: chain.value, noFormChecked: true});
      window.location.hash = '#/formbuilder/' + chain.value;
    }
  };

  updateFormBuilderChains(field) {
    const fieldToAdd = {
      field,
      idx: this.state.chainIndex,
    };
    this.props.addField(fieldToAdd);
  }


  handleInputAdd = () => {
    const {
      inputTypes,
      inputTypeIndex
    } = this.state;
    switch (inputTypes[inputTypeIndex]) {
      case 'Input': {
        this.updateFormBuilderChains(
          {
            label: '',
            paramName: '',
            regEx: '',
            type: inputTypes[inputTypeIndex],
          }
        );
        break;
      }
      case 'DropDown': {
        this.updateFormBuilderChains(
          {
            label: '',
            paramName: '',
            type: inputTypes[inputTypeIndex],
            dropDownOptions: [],
          });
        break;
      }
      case 'DatePicker': {
        this.updateFormBuilderChains(
          {
            label: '',
            paramName: '',
            type: inputTypes[inputTypeIndex],
          });
        break;
      }
      case 'NoForm': {
        this.updateFormBuilderChains({
          type: inputTypes[inputTypeIndex],
        });
        break;
      }
      default:
        console.log('UNEXPECTED FIELD TYPE!');
    }
  };

  onFieldRemove = (idx) => {
    const indx = this.state.chainIndex;
    const result = {
      fieldIdx: idx,
      chainIdx: indx,
    };
    this.props.removeField(result);
  };

  onFieldsUpdate = (fields) => {
    const updFields = {
      fields,
      idx: this.state.chainIndex,
    };
    this.props.updateFieldsValues(updFields);
  };

  renderFormBody = () => {
    const {formBuilderChains} = this.props;
    const {chainIndex, inputTypeIndex, inputTypes} = this.state;
    const disablePlus = () => {
      return formBuilderChains[chainIndex].fields.findIndex(field => {
        return field.type === 'NoForm';
      }) !== -1;
    };

    let crunchLocalization = (fieldType) => {
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

    const noFormClicked = () => {
      if(!this.state.noFormChecked){
        this.updateFormBuilderChains({
          type: 'NoForm',
        });
        this.setState({noFormChecked: !this.state.noFormChecked});
      } else {
        this.onFieldRemove(formBuilderChains[chainIndex].fields.length -1);
        this.setState({noFormChecked: !this.state.noFormChecked});
      }
    };

    return (
      <div>
        <Form>

          <Row>
            <Col md={2} style={{
              width: 'fit-content'
            }}>
              <ButtonGroup>
                <DropdownButton
                  id='chainSelector'
                  onSelect={(inputTypeIndex) => this.setState({inputTypeIndex})}
                  title={crunchLocalization(inputTypes[inputTypeIndex])}
                  bsSize="large"
                >
                  {inputTypes.map((input, index) => (
                    <MenuItem active={index === inputTypeIndex} key={index + 1}
                              eventKey={index}>
                      {crunchLocalization(input)}
                    </MenuItem>
                  ))}
                </DropdownButton>
                <Button disabled={disablePlus()} onClick={this.handleInputAdd} bsSize="large" bsStyle="info"><Glyphicon
                  glyph="plus"/></Button>
              </ButtonGroup>
            </Col>
            <Col md={2} style={{height: 'fit-content'}}>
              <Alert style={{
                border: '1px solid #CCC',
                width: 'fit-content',
                height: 'fit-content',
                borderRadius: 5,
                padding: '0px 5px',
                fontSize: '18px',
              }} bsStyle={'default'}>
                <Checkbox checked={this.state.noFormChecked} onChange={noFormClicked}>Запуск без формы</Checkbox>
              </Alert>
            </Col>
          </Row>
          <ListGroup style={{maxHeight: '655px', overflow: 'auto'}}>
            <FieldPicker
              onChange={this.onFieldsUpdate}
              fields={formBuilderChains[chainIndex].fields}
              odx={0}
              collapseFields={this.state.noFormChecked}
              onFieldRemove={this.onFieldRemove}
            />
          </ListGroup>
        </Form>
      </div>
    );
  };

  submitChanges = () => {
    const chainName = this.props.formBuilderChains[this.state.chainIndex].name;
    const fields = this.props.formBuilderChains[this.state.chainIndex];
    const chainIndex = this.state.chainIndex;
    if ((-1) !== fields.fields.findIndex(field => {
        return field.type === 'NoForm'
      })) {
      fields.fields = [{}];
    }
    this.props.submit(chainName, fields, chainIndex);
  };

  render() {
    const {formBuilderChains, notifications} = this.props;
    const {chainIndex} = this.state;
    const chainsForSelect = formBuilderChains.map((chain, index) => {
      return {label: chain.name, value: index}
    });

    const chainDropDown = [
      <Row>
        <Col md='8' style={{width: '30%'}}>
          {formBuilderChains.length > 0 &&
          <Select
            key={'selectChainElement'}
            options={chainsForSelect}
            wrapperStyle={{position: 'relative', zIndex: '4'}}
            onChange={this.onChainSelected}
            clearable={false}
            value={chainIndex !== null ?
              {label: formBuilderChains[chainIndex].name, value: chainIndex}
              : {label: 'Выберите цепочку...', value: 'Выберите цепочку...'}}
            menuStyle={{overflowX: 'hidden'}}
            style={{borderRadius: '4px 4px 4px 4px'}}
            shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
            promptTextCreator={name => name}
            noResultsText={'Результаты не найдены'}
            optionRenderer={(opt) => {
              return (
                <Row>
                  <Col md='10'>
                    <span>{opt.label}</span>
                  </Col>
                  <Col md='2'>
                    {chainIndex !== null
                    && formBuilderChains[opt.value].modified
                    && <Label bsStyle="warning">Modified</Label>}
                  </Col>
                </Row>
              );
            }}
          />}
        </Col>
        <Button className="pull-right" style={{marginRight: '1%'}} onClick={this.handleShow}>
          <Glyphicon glyph='glyphicon glyphicon-question-sign'/>
        </Button>
        <div className="clearfix"/>
      </Row>,
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Конструктор форм</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Чтобы редактировать форму существующей цепочки, необходимо:</p>
          <li type="square">Выбрать цепочку из выпающего списка вверху слева</li>
          <li type="square">Выбрать тип поля в выпадающем списке снизу слева и нажать кнопку +</li>
          <li type="square">Ввести необходимые для данного поля параметры</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Отправить</li>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    ];
    const submitBtn = [
      formBuilderChains.length > 0 && <Button
        onClick={this.submitChanges}
        bsStyle="success"
        bsSize="large"
        className="pull-right"
        disabled={
          !(chainIndex !== null && formBuilderChains[chainIndex].modified)
        }
      >
        Отправить
      </Button>,
      <div className="clearfix"/>
    ];
    return (
      <div>
        <Header/>
        <Panel style={{marginTop: '1%', position: 'relative'}}
               header={formBuilderChains.length > 0 ? chainDropDown : null} footer={submitBtn}
               bsStyle="default">
          <Grid fluid={true}>
            {chainIndex !== null && formBuilderChains[chainIndex] && this.renderFormBody()}
          </Grid>
        </Panel>
        <Notifications notifications={notifications}/>
      </div>
    )
  }
}

export default FormBuilderPage
