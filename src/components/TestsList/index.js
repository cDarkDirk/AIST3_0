import React from 'react'
import './style.css'
import SearchBar from "../SearchBar";
import {
  Button,
  ListGroupItem,
  ListGroup,
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
    const {setSelectedTestIndex, systems, testBuilderTests, testNamesForDropdown, filteredTests} = this.props;
    const selectedChainTemplateTests = this.props.selectedChainTemplate.tests || [];
    const selectedChainTemplateIndex = this.props.selectedChainTemplateIndex;
    if (selectedChainTemplateIndex !== null) {
      const testBuilderTests2 = testBuilderTests.filter(t => {
        const testInChain = selectedChainTemplateTests.find((element) => {
          return element === t.test_id
        });
        return !testInChain
      });
      if (testBuilderTests2[index].a_system !== '') {
        let sysIndex = systems.map(sys => sys.code).indexOf(testBuilderTests2[index].a_system);
        this.setState({selectedSystem: sysIndex});
      } else {
        this.setState({selectedSystem: null});
      }
      const test = {test_name: testBuilderTests2[index].name, test_id: testBuilderTests2[index].test_id};
      this.props.testBlockClicked(test);
    }
  };

  renderSearches = () => {
    const {testNamesForDropdown} = this.props;
    const selectedChainTemplateTests = this.props.selectedChainTemplate.tests || [];
    const filteredTests = testNamesForDropdown.filter(t => {
      const testInChain = selectedChainTemplateTests.find((element) => {
        return element === t.test_id
      });
      return !testInChain
    });
    const searchOpt = filteredTests.map((test, index) => {
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
          <Button style={{position: 'relative', marginRight: '14px', marginTop: '5px'}} className={'pull-right'}
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
                  noResultsText={'Результаты не найдены'}
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
                  noResultsText={'Результаты не найдены'}
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
                  noResultsText={'Результаты не найдены'}
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
      searchBarSwitcher()
    ];
  };
  renderTestsList = () => {
    const {
      testBuilderTests,
      selectedTestIndex,
      testNamesForDropdown,
    } = this.props;
    const selectedChainTemplateTests = this.props.selectedChainTemplate.tests || [];
    const filteredTests = testNamesForDropdown.filter(t => {
      const testInChain = selectedChainTemplateTests.find((element) => {
        return element === t.test_id
      });
      return !testInChain
    });
    return (filteredTests.map((test, index) => {
      return (
        <ListGroupItem className='use-test-button' onClick={() => {
          this.handleTestSelection(index)
        }} key={index}>
          {test.test_name}
          {/*{testBuilderTests[index].modified && <Label style={{marginLeft: 5}} bsStyle="warning">Modified</Label>}*/}
          {/*{testBuilderTests[index].new && <Label style={{marginLeft: 5}} bsStyle="primary">New</Label>}*/}
        </ListGroupItem>
      )
    }));

  };


  render() {
    const {testNamesForDropdown} = this.props;
    const selectedChainTemplateTests = this.props.selectedChainTemplate.tests || [];
    const filteredTests = testNamesForDropdown.filter(t => {
      const testInChain = selectedChainTemplateTests.find((element) => {
        return element === t.test_id
      });
      return !testInChain
    });
    return [
      <ol>
        <Toolbar
          style={{marginLeft: -40, marginRight: -40}}
          additionalElement={this.renderSearches()}
        />
        <Row>
          <ListGroup style={{marginLeft: -5, marginRight: -5, maxHeight: '1080px', overflow: 'auto'}}>
            {filteredTests !== undefined ? this.renderTestsList() : null}
          </ListGroup>
        </Row>
      </ol>
    ]
  }
}

export default TestsList
