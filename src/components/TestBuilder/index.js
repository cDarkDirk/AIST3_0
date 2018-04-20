import React from "react"
import {
  Grid,
  Button,
  ListGroupItem,
  ListGroup,
  InputGroup,
  Row,
  Col,
  Label,
  Glyphicon,
  Modal,
  Alert,
} from 'react-bootstrap'
import 'react-select/dist/react-select.css'
import Select from 'react-select'
import Notifications from 'react-notification-system-redux'
import SearchBar from "../SearchBar";
import Header from "../Header";
import {forceLogin, getUserName} from '../../globalFunc';
import Toolbar from "../toolbar/index";
import TestParamsForm from "./TestParamsForm";
import './style.css';

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
      tags: [],
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  handleTagInputChange = (value, field) => {
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
  };

  handleInputChange = (value, param) => {
    const toPayload = {
      paramValue: value,
      paramName: param,
    };
    this.props.testBuilderFormInputChanged(toPayload);
  };

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

  handleSearchByTagsInputChanges = (tags) => {
    if (tags.length > 0) {
      this.setState({tags});
      let formattedTags = {tag_names: tags.map(t => t.label)};
      this.props.filterTestsByTags(formattedTags);
    } else {
      this.props.getTests();
      this.setState({tags: []});
    }
  };

  renderSearches = () => {
    const searchOpt = this.props.testNamesForDropdown.map((test, index) => {
      return {label: test.test_name, value: index}
    });
    return [
      <SearchBar options={searchOpt} placeholder={'Поиск теста по названию...'}
                 onOptionClick={this.handleTestSelection}/>,
      <InputGroup>
        <InputGroup.Addon><Glyphicon glyph='glyphicon glyphicon-tags'/></InputGroup.Addon>
        <Select.Creatable
          multi
          value={this.state.tags}
          placeholder={'Поиск теста по тегам...'}
          menuStyle={{display: 'none'}}
          arrowRenderer={null}
          options={[]}
          shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
          promptTextCreator={name => name}
          onChange={this.handleSearchByTagsInputChanges}
          style={{borderRadius: '0 4px 4px 0'}}
        />
      </InputGroup>
    ];
  };

  renderToolbar = () => {
    const {
      testBuilderTests,
      selectedTestIndex,
      addNewTest,
      duplicateCurrentTest,
    } = this.props;

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
            <Button bsStyle={'success'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-floppy-disk'/></Button>
          </li>
          <br/>
          <p>Чтобы создать тест, необходимо:</p>
          <li type="square">Нажать кнопку <Button bsStyle={'primary'} bsSize={'small'}><Glyphicon
            glyph='glyphicon glyphicon-plus-sign'/></Button></li>
          <li type="square">Заполнить необходимые параметры теста в форме справа</li>
          <li type="square" style={{color: 'red'}}>Обратите внимание, что выбор АС для теста обязателен!</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку
            <Button bsStyle={'success'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-floppy-disk'/></Button>
          </li>
          <br/>
          <p>Чтобы скопировать существующий тест, необходимо:</p>
          <li type="square">Выбрать тест в списке слева</li>
          <li type="square">Нажать кнопку <Button bsStyle={'primary'} bsSize={'small'}><Glyphicon
            glyph='glyphicon glyphicon-duplicate'/></Button></li>
          <li type="square">Заполнить необходимые параметры теста в форме справа</li>
          <li type="square" style={{color: 'red'}}>Обратите внимание, что выбор АС для теста обязателен!</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку
            <Button bsStyle={'success'} bsSize={'small'}><Glyphicon glyph='glyphicon glyphicon-floppy-disk'/></Button>
          </li>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>);

    return (
      <Row>
        {helpModal}
        <Toolbar
          help={this.handleShow}
          redirDisabled={true}
          onNewEntryAdded={() => addNewTest()}
          onDuplicate={duplicateCurrentTest}
          submitDisabled={!(selectedTestIndex !== null
            && this.state.selectedSystem !== null
            && (testBuilderTests[selectedTestIndex].modified
              || testBuilderTests[selectedTestIndex].new))}
          onSubmit={this.handleSubmitButtonClick}
          style={{marginLeft: 10}}
          additionalElement={this.renderSearches()}
        />
        <div style={{height: '10px'}}/>
      </Row>
    )
  };

  renderTestsList = () => {
    const {
      testBuilderTests,
      selectedTestIndex,
      testNamesForDropdown,
    } = this.props;
    return (testNamesForDropdown.map((test, index) =>
      <ListGroupItem
        onClick={() => this.handleTestSelection(index)}
        active={index === selectedTestIndex}
        key={index}
      >
        {test.test_name}
        {testBuilderTests[index].modified && <Label style={{marginLeft: 5}} bsStyle="warning">Modified</Label>}
        {testBuilderTests[index].new && <Label style={{marginLeft: 5}} bsStyle="primary">New</Label>}
      </ListGroupItem>));
  };

  renderNoResultsAlert = () => {
    return (
      <Row>
        <Alert style={{marginLeft: 10}} bsStyle="danger">Ни одного теста не найдено!</Alert>
      </Row>
    )
  };

  render() {
    const {
      notifications,
      selectedTestIndex,
      systems,
      testBuilderTests,
    } = this.props;
    let location = window.location.hash.split('/');
    if (location[2] === undefined && selectedTestIndex !== null) {
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
    return (
      <div>
        <Header owner={getUserName()}/>
        <Grid fluid={true} className={'test-builder-main'}>
          <Row>
            <Col md={3}>
              {testBuilderTests !== undefined ? this.renderToolbar() : null}
              {testBuilderTests.length <= 0 ? this.renderNoResultsAlert() : null}
              <Row>
                <ListGroup style={{marginLeft: 10, maxHeight: '780px', overflow: 'auto'}}>
                  {testBuilderTests !== undefined ? this.renderTestsList() : null}
                </ListGroup>
              </Row>
            </Col>
            <Col md={9}>
              {testBuilderTests && selectedTestIndex !== null && (systems.length > 0)
                ? <TestParamsForm
                  handleSystemChanges={this.handleSystemChanges}
                  selectedSystem={this.state.selectedSystem}
                  handleTagInputChange={this.handleTagInputChange}
                  handleInputChange={this.handleInputChange}
                  {...this.props}
                />
                : null}
            </Col>
          </Row>
        </Grid>
        <Notifications notifications={notifications}/>
      </div>
    )
  }

}

export default TestBuilderPage
