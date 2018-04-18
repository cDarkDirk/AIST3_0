import React from "react"
import {
  Panel,
  Grid,
  Button,
  Form,
  ListGroupItem,
  ListGroup,
  FormGroup,
  InputGroup,
  FormControl,
  Row,
  Col,
  Label,
  Glyphicon,
  Modal,
} from 'react-bootstrap'
import 'react-select/dist/react-select.css'
import Select from 'react-select'
import Notifications from 'react-notification-system-redux'
import SearchBar from "../SearchBar";
import Header from "../Header";
import {forceLogin, getUserName, setTooltip} from '../../globalFunc';
import DropdownList from "../DropdownList";
import Toolbar from "../toolbar/index";

class TestBuilderPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    forceLogin();
    this.props.getTests();
    this.props.getAS();
    this.props.getStands();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSystemChanges = this.handleSystemChanges.bind(this);

    this.state = {
      show: false,
      selectedSystem: null,
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }


  handleTagInputChange(value, field) {
    const {testBuilderTests, selectedTestIndex} = this.props;

    const crunch = value.map((field, index) => {
      return {label: field.label, value: index};
    });
    const toPayload = {
      paramValue: {...testBuilderTests[selectedTestIndex].tag_names},
      paramName: 'tag_names',
    };
    toPayload.paramValue[field] = crunch;
    this.props.testBuilderFormInputChanged(toPayload);
  }

  handleInputChange(value, param) {
    const toPayload = {
      paramValue: value,
      paramName: param,
    };
    this.props.testBuilderFormInputChanged(toPayload);
  }

  handleSystemChanges(index) {
    this.setState({selectedSystem: index});
    this.props.sysIndexChanged(index);
  }

  handleSubmitButtonClick = () => {
    const {testBuilderTests, selectedTestIndex, testNamesForDropdown, systems, submitCurrentTest} = this.props;
    let test = {...testBuilderTests[selectedTestIndex]};
    let id = testNamesForDropdown[selectedTestIndex].test_id;
    let currentStands = test.stands.map(stand => stand.label);
    test.a_system = systems[this.state.selectedSystem].code;
    test.stands = currentStands;
    submitCurrentTest({test, id});
  };

  handleTestSelection = (index) => {
    const {setSelectedTestIndex, systems, testBuilderTests} = this.props;
    if (testBuilderTests[index].a_system !== '') {
      let sysIndex = systems.map(sys => sys.code).indexOf(testBuilderTests[index].a_system);
      this.setState({selectedSystem: sysIndex});
    } else {
      this.setState({selectedSystem: null});
    }
    setSelectedTestIndex(index);
  };

  renderTestParamsForm = () => {
    const {testBuilderTests, selectedTestIndex, systems, stands, testStandsInputChange} = this.props;
    return (
      <Form>
        <ListGroupItem bsStyle="success">
          <FormGroup>
            <Panel header={'Параметры теста:'}>
              <Row>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Наименование теста</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].test_name}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'test_name')}
                                 type="text"/>
                    <InputGroup.Button>
                      <DropdownList
                        id={'asSelector' + testBuilderTests[selectedTestIndex].test_name}
                        options={systems}
                        selLabel={this.state.selectedSystem !== null
                          ? systems[this.state.selectedSystem].code
                          : 'Название АС'}
                        labelKey='code'
                        pullRight
                        noCaret
                        bsStyle={this.state.selectedSystem !== null ? 'success' : 'danger'}
                        tooltip={setTooltip(
                          'asSelectorTooltip' + testBuilderTests[selectedTestIndex].test_name,
                          'Выберите АС для теста')}
                        selectedIndex={this.state.selectedSystem}
                        onSelect={this.handleSystemChanges}
                      />
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Доступные стенды</InputGroup.Addon>
                    <Select.Creatable
                      id={'stands' + testBuilderTests[selectedTestIndex].test_name}
                      multi={true}
                      wrapperStyle={{zIndex: '1', position: 'relative'}}
                      options={stands.length > 0 ? stands : []}
                      onChange={(stands) => testStandsInputChange(stands)}
                      style={{borderRadius: '0 4px 4px 0'}}
                      value={testBuilderTests[selectedTestIndex].stands}

                    />
                  </InputGroup>
                </Col>
              </Row>
            </Panel>
            <Panel header={'Параметры Jenkins:'}>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>URL</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.uri}
                                 style={{zIndex: '0', position: 'relative'}}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'uri')}
                                 type="text"/>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Login</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.login}
                                 style={{zIndex: '0', position: 'relative'}}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'login')}
                                 type="text"/>
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Job name</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.jobName}
                                 style={{zIndex: '0', position: 'relative'}}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'job_name')}
                                 type="text"/>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Job token/pass</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.passOrToken}
                                 style={{zIndex: '0', position: 'relative'}}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'passOrToken')}
                                 type="text"/>
                  </InputGroup>
                </Col>
              </Row>
            </Panel>
            <Panel header={'Теги:'}>
              <Row>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Статические теги</InputGroup.Addon>
                    <Select.Creatable
                      id={'static' + testBuilderTests[selectedTestIndex].test_name}
                      multi={true}
                      options={[]}
                      menuStyle={{display: 'none'}}
                      arrowRenderer={null}
                      autosize={false}
                      onChange={(values) => this.handleTagInputChange(values, 'static')}
                      value={testBuilderTests[selectedTestIndex].tag_names.static}
                      style={{borderRadius: '0 4px 4px 0'}}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Динамические теги</InputGroup.Addon>
                    <Select.Creatable
                      id={'dynamic' + testBuilderTests[selectedTestIndex].test_name}
                      multi={true}
                      options={[]}
                      menuStyle={{display: 'none'}}
                      arrowRenderer={null}
                      autosize={false}
                      onChange={(values) => this.handleTagInputChange(values, 'dynamic')}
                      value={testBuilderTests[selectedTestIndex].tag_names.dynamic}
                      style={{borderRadius: '0 4px 4px 0'}}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Panel>
          </FormGroup>
        </ListGroupItem>
      </Form>
    )
  };

  render() {
    const {
      notifications,
      testBuilderTests,
      selectedTestIndex,
      testNamesForDropdown,
      addNewTest,
      systems,
      duplicateCurrentTest,
    } = this.props;
    let location = window.location.hash.split('/');
    if (location[2] === undefined && selectedTestIndex !== null){
      this.handleTestSelection(selectedTestIndex);
    } else {
      for (let i = 0; i < this.props.testNamesForDropdown.length; i++) {
        let mySecondStr = this.props.testNamesForDropdown[i].test_name;
        if (location[2] === mySecondStr && selectedTestIndex !== i) {
          this.handleTestSelection(i);
          break;
        }
      }
    }
    const testsList = () => (testNamesForDropdown.map((test, index) =>
      <ListGroupItem
        onClick={() => this.handleTestSelection(index)}
        active={index === selectedTestIndex}
        key={index}
      >
        {test.test_name}
        {testBuilderTests[index].modified && <Label style={{marginLeft: 5}} bsStyle="warning">Modified</Label>}
        {testBuilderTests[index].new && <Label style={{marginLeft: 5}} bsStyle="primary">New</Label>}
      </ListGroupItem>));

    const helpModal = (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Конструктор тестов</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Чтобы редактировать тест, необходимо:</p>
          <li type="square">Выбрать тест из списка слева, или аоспользоваться строкой поиска</li>
          <li type="square">Заполнить необходимые параметры теста в форме справа</li>
          <li type="square" style={{color: 'red'}}>Обратите внимание, что выбор АС для теста обязателен!</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку
            <Button bsStyle={'success'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-floppy-disk'/></Button></li>
          <br/>
          <p>Чтобы создать тест, необходимо:</p>
          <li type="square">Нажать кнопку <Button bsStyle={'primary'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-plus-sign'/></Button></li>
          <li type="square">Заполнить необходимые параметры теста в форме справа</li>
          <li type="square" style={{color: 'red'}}>Обратите внимание, что выбор АС для теста обязателен!</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку
            <Button bsStyle={'success'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-floppy-disk'/></Button></li>
          <br/>
          <p>Чтобы скопировать существующий тест, необходимо:</p>
          <li type="square">Выбрать тест в списке слева</li>
          <li type="square">Нажать кнопку <Button bsStyle={'primary'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-duplicate'/></Button></li>
          <li type="square">Заполнить необходимые параметры теста в форме справа</li>
          <li type="square" style={{color: 'red'}}>Обратите внимание, что выбор АС для теста обязателен!</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку
            <Button bsStyle={'success'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-floppy-disk'/></Button></li>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>);

    const searchOpt = testNamesForDropdown.map((test, index) => {
      return {label: test.test_name, value: index}
    });
    return (
      <div>
        <Header owner={getUserName()}/>
        <Grid fluid={true}>
          <Row>
            <Col md={3}>
              <Row>
                {helpModal}
                <Toolbar
                  help={this.handleShow}
                  redirDisabled={true}
                  onNewEntryAdded={() => addNewTest()}
                  additionalElement={<SearchBar options={searchOpt} onOptionClick={this.handleTestSelection}/>}
                  onDuplicate={duplicateCurrentTest}
                  submitDisabled={!(selectedTestIndex !== null
                    && this.state.selectedSystem !== null
                    && (testBuilderTests[selectedTestIndex].modified
                      || testBuilderTests[selectedTestIndex].new))}
                  onSubmit={this.handleSubmitButtonClick}
                  style={{marginLeft: 10}}
                />
                <div style={{height: '10px'}}/>
              </Row>
              <Row>
                <ListGroup style={{marginLeft: 10, maxHeight: '780px', overflow: 'auto'}}>
                  {testsList()}
                </ListGroup>
              </Row>
            </Col>
            <Col md={9}>
              {selectedTestIndex !== null && (systems.length > 0) ? this.renderTestParamsForm() : null}
            </Col>
          </Row>
        </Grid>
        <Notifications notifications={notifications}/>
      </div>
    )
  }

}

export default TestBuilderPage
