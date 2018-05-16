import React from 'react'
import './style.css'
import SearchBar from "../SearchBar";
import {
  Button,
  ListGroupItem,
  InputGroup,
  Row,
  Label,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
} from 'react-bootstrap'
import Toolbar from "../toolbar"
import Select from 'react-select'

class TestsList extends React.Component {
  constructor(props, context) {
    super(props, context);
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
  componentDidMount() {
    this.props.fetchTests();
    this.props.getTests();
    this.props.getAS();
    this.props.getStands();
  }

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

  handleTestSelection = (index) => {
    const {setSelectedTestIndex, systems, testBuilderTests} = this.props;
    if (testBuilderTests[index].a_system !== '') {
      let sysIndex = systems.map(sys => sys.code).indexOf(testBuilderTests[index].a_system);
      this.setState({selectedSystem: sysIndex});
    } else {
      this.setState({selectedSystem: null});
    }
    setSelectedTestIndex(index);
    const test = {test_name: testBuilderTests[index].name, test_id: testBuilderTests[index].test_id};
    this.props.testBlockClicked(test);
  };

  renderSearches = () => {
    const {testNamesForDropdown} = this.props;
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
        <InputGroup.Addon>Фильтры:</InputGroup.Addon>
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
      searchBarSwitcher(),
      <Row>
      {testNamesForDropdown !== undefined ? this.renderTestsList() : null}
      </Row>,

    ];
  };
  renderTestsList = () => {
    const {
      testBuilderTests,
      selectedTestIndex,
      testNamesForDropdown,
    } = this.props;
    return (testNamesForDropdown.map((test, index) => {
        return (
        <ListGroupItem className='use-test-button' onClick={() => {
          this.handleTestSelection( index)
        }}   active={index === selectedTestIndex}
             key={index}>
          {test.test_name}
          {testBuilderTests[index].modified && <Label style={{marginLeft: 5}} bsStyle="warning">Modified</Label>}
          {testBuilderTests[index].new && <Label style={{marginLeft: 5}} bsStyle="primary">New</Label>}
        </ListGroupItem>
        )}));

  };


  render() {
    return [
      <ol>
        <Toolbar
          style={{marginLeft: 10}}
          additionalElement={this.renderSearches()}
        />
      </ol>
    ]
  }
}

export default TestsList
