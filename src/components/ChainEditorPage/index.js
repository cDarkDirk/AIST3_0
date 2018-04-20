import React from 'react'
import ChainDisplay from '../../containers/ChainDisplay'
import ChainList from "../../containers/ChainList"
import {Row, Col, Modal, FormGroup, InputGroup, FormControl,Button} from "react-bootstrap"
import TestsList from "../../containers/TestsList"
import Notifications from 'react-notification-system-redux'
import './style.css'
import Toolbar from "../toolbar"
import {createConfirmation} from "react-confirm"
import ConfirmationDialog from "../ConfirmationDialog"
import SearchBar from "../SearchBar"
import NotifyUser from "../NotifyUser/NotifyUser"
import Select from 'react-select'
import Header from "../Header";
import {forceLogin, getUserName} from '../../globalFunc';

class ChainEditorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props.fetchGroupsForMembers();
    this.props.fetchBuilderChains();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.props.fetchChainTemplates();
    this.props.getAllDataTemplates();

    this.state = {
      groups: [],
      show: false,
    };
  }

  handleGroupChange(groups){
    this.setState({groups});
    this.props.addGroupToChain(groups);
  }

  componentWillMount(){
    forceLogin();
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  render() {
    const {
      chainTemplate, chainTemplateNameChanged, deleteChainTemplate,
      addChainTemplate, updateChainTemplate, notifications,
      chainTemplateMarkerChanged, chainSelected, chainName,
      onChainSelected, duplicate, chainNames, owner,
      dataTemplatesNames, selectedGroups,
    } = this.props;

    const confirm = createConfirmation(ConfirmationDialog, 0);
    const notify = createConfirmation(NotifyUser, 0);
    const deleteChain = () => {
      if (chainTemplate.owner === owner) {
        confirm({confirmation: `Do you really want to delete ${chainTemplate.name}?`}).then(
          () => deleteChainTemplate(chainTemplate),
          () => {
          })
      }
      else {
        notify({confirmation: `You can't delete ${chainTemplate.name}, because ${chainTemplate.name} created by another user!`}).then(
          () => {})
      }
    };
    const modalTooltip = (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Конструктор цепочек</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Чтобы редактировать существующую цепочку, необходимо:</p>
          <li type="square">Выбрать цепочку из списка слева</li>
          <li type="square">Выбрать необходимые тесты справа</li>
          <li type="square">(Опционально) Поменять порядок тестов, перетащив нужный элемент на нужную позицию</li>
          <li type="square">(Опционально) Изменить имя цепочки в поле Name</li>
          <li type="square">(Опционально) Изменить маркер цепочки в поле Marker</li>
          <li type="square">(Опционально) Изменить список доступных для цепочки шаблонов с параметрами</li>

          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
          <br/>
          <p>
            Чтобы создать новую чепочку, необходимо:
          </p>
          <li type="square">Нажать кнопку Add new chain template</li>
          <li type="square">Выбрать необходимые тесты справа</li>
          <li type="square">Поменять порядок тестов, перетащив нужный элемент на нужную позицию</li>
          <li type="square">Изменить имя цепочки в поле Name</li>
          <li type="square">Изменить маркер цепочки в поле Marker</li>
          <li type="square">(Опционально) Изменить список доступных для цепочки шаблонов с параметрами</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
    const options = dataTemplatesNames.map((name) => {
      return {label: name, value: name};
    });
    const groups = selectedGroups.map((name, index) => {
      return {label: name, value: index};
    });
    const chainParamsInput = [
      <Row>
        <Col md={12}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>Name</InputGroup.Addon>
              <FormControl
                type="text"
                value={chainTemplate.name}
                placeholder="Chain Name"
                onChange={e => chainTemplateNameChanged(e.target.value)}/>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>,
      <Row>
        <Col md={12}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>Marker</InputGroup.Addon>
              <FormControl
                type="text"
                value={chainTemplate.marker}
                placeholder="Marker"
                onChange={e => chainTemplateMarkerChanged(e.target.value)}/>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>,
      <Row>
        <Col md={12}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>Data templates</InputGroup.Addon>
              <Select.Creatable
                multi={true}
                options={options}
                onChange={dt => this.props.addDTToChain(dt)}
                value={chainTemplate.templates}
                id={"balla2"}
                shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                promptTextCreator={name => name}
              />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>,
      <Row>
        <Col md={12}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>Group</InputGroup.Addon>
              <Select.Creatable
                multi={true}
                options={groups}
                onChange = {this.handleGroupChange}
                value = {chainTemplate.groups}
                placeholder="Select"
                id={"balla"}
                shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                promptTextCreator={name => name}
              />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    ];
    const searchOpt = chainNames.map((chain,index) => {
      return {value:index, label:chain}
    });
    return [
      <Header owner={getUserName()}/>,
      <div className='container chain-editor-main'>
        <Row>
          <Col md={3}>
            <SearchBar
              options={searchOpt}
              onOptionClick={onChainSelected}
            />
            <ChainList/>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={12}>
                <Toolbar
                  onNewEntryAdded={() => addChainTemplate(owner)}
                  help={this.handleShow}
                  onSubmit={() => updateChainTemplate({name: chainName, value: chainTemplate,})}
                  chainName={chainName}
                  chainTemplate={chainTemplate}
                  submitDisabled={!(chainTemplate.modified || chainTemplate.new)}
                  link={'#/formbuilder/' + chainSelected}
                  redirText={'Редактировать форму'}
                  redirDisabled={this.props.chainSelected === null}
                  onDuplicate={() => duplicate()}
                  additionalElement={this.props.chainSelected !== null ? chainParamsInput : null}
                />
                {modalTooltip}
              </Col>
            </Row>
            <div style={{height: '10px'}}/>
            <Row>
              <ChainDisplay chainTemplate={chainTemplate}/>
            </Row>
          </Col>
          <Col md={3}>
            <TestsList/>
          </Col>
        </Row>
        <Notifications notifications={notifications}/>
      </div>
    ]
  }
}

export default ChainEditorPage
