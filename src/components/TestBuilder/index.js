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
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
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
      sysFilterOpts: null,
      standsFilterOpts: null,
      selectedFilter: [],
      filters: {
        tags: [],
        systems: null,
        stands: null,
      }
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

  handleSearchTagCreation = (tags) => {
    if (tags.length > 0) {
      this.setState({
        filters: {
          ...this.state.filters,
          tags,
        }
      });
    } else {
      this.setState({
        filters: {
          ...this.state.filters,
          tags: [],
        }
      });
    }
  };

  handleSysFilterInput = (filterOpts) => {
    if (filterOpts !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          systems: filterOpts,
        }
      });
    } else {
      this.setState({
        filters: {
          ...this.state.filters,
          systems: null,
        }
      });
    }
  };

  handleStandsFilterInput = (filterOpts) => {
    if (filterOpts !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          stands: filterOpts,
        }
      });
    } else {
      this.setState({
        filters: {
          ...this.state.filters,
          stands: null,
        }
      });
    }
  };

  clearSearchInputs = (filter) => {
    this.props.clearTestFilter();
    this.setState({
      selectedFilter: filter,
      filters: {
        tags: [],
        systems: null,
        stands: null,
      }
    });
  };

  handleApplyFiltersBtn = () => {
    if (this.state.filters.tags.length > 0) {
      let formattedTags = {tag_names: this.state.filters.tags.map(t => t.label)};
      this.props.filterTestsByTags(formattedTags, this.state.filters);
    } else {
      if (this.state.filters.systems !== null || this.state.filters.stands !== null) {
        this.props.applyTestsFilters(this.state.filters);
      } else {
        this.props.clearTestFilter();
      }
    }
  };

  renderSearches = () => {
    const searchOpt = this.props.testNamesForDropdown.map((test, index) => {
      return {label: test.test_name, value: index}
    });
    const sysToSearchThrough = this.props.systems.map((sys, idx) => {
      return {label: sys.code, value: idx}
    });
    const searchBarSwitcher = () => {
      let searches = [];
      let filters = [...this.state.selectedFilter];
      let applyFiltersBtn = this.state.selectedFilter.length > 0 ? (
        <Row>
          <Button className={'pull-right'} style={{position: 'relative', marginRight: '14px', marginTop: '5px'}}
                  onClick={this.handleApplyFiltersBtn}>Применить</Button>
          <div className="clearfix"/>
        </Row>
      ) : null;
      if (filters.length > 0) {
        while (filters.length > 0) {
          switch (filters.shift()) {
            case 'tags': {
              searches.push(
                <Select.Creatable
                  multi
                  value={this.state.filters.tags}
                  placeholder={'Фильтрация тестов по тегам...'}
                  menuStyle={{display: 'none'}}
                  arrowRenderer={null}
                  options={[]}
                  shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                  promptTextCreator={name => name}
                  onChange={this.handleSearchTagCreation}
                />
              );
              break;
            }

            case 'as': {
              searches.push(
                <Select
                  className='test-filter'
                  options={sysToSearchThrough}
                  placeholder={'Фильтрация тестов по АС...'}
                  onChange={this.handleSysFilterInput}
                  value={this.state.filters.systems}
                />
              );
              break;
            }

            case 'stand': {
              searches.push(
                <Select
                  className='test-filter'
                  options={this.props.stands}
                  placeholder={'Фильтрация тестов по контуру...'}
                  onChange={this.handleStandsFilterInput}
                  value={this.state.filters.stands}
                />
              );
              break;
            }

            default:
              break;
          }

        }
      }
      searches.push(applyFiltersBtn);
      return searches;
    };

    return [
      <SearchBar options={searchOpt} placeholder={'Поиск теста по названию...'}
                 onOptionClick={this.handleTestSelection}/>,
      <InputGroup style={{marginBottom: '5px', marginTop: '5px'}}>
        <InputGroup.Addon>Фильтрация по:</InputGroup.Addon>
        <ButtonToolbar>
          <ButtonGroup>
            <ToggleButtonGroup type='checkbox' name='searchesSwitcher' value={this.state.selectedFilter}
                               onChange={searchType => this.clearSearchInputs(searchType)}>
              <ToggleButton style={{borderRadius: '0'}} value={'tags'}>Тегам</ToggleButton>
              <ToggleButton value={'as'}>АС</ToggleButton>
              <ToggleButton value={'stand'}>Контуру</ToggleButton>
            </ToggleButtonGroup>
            {this.state.selectedFilter.length > 0
              ? <Button bsStyle='danger'
                        onClick={() => this.clearSearchInputs([])}>Сброс</Button>
              : null}
          </ButtonGroup>
        </ButtonToolbar>
      </InputGroup>,
      searchBarSwitcher()
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
          onNewEntryAdded={() => {
            addNewTest();
            this.setState({selectedSystem: null});
          }}
          onDuplicate={duplicateCurrentTest}
          submitDisabled={!(selectedTestIndex !== null
            && this.state.selectedSystem !== null
            && (testBuilderTests[selectedTestIndex].modified
              || testBuilderTests[selectedTestIndex].new))}
          onSubmit={this.handleSubmitButtonClick}
          style={{marginLeft: 10}}
          additionalElement={this.renderSearches()}
          duplicateDisabled={selectedTestIndex === null}
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
