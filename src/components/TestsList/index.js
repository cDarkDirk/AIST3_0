import React from 'react'
import TestBlock from '../TestBlock'
import './style.css'
import SearchBar from "../SearchBar";
import {Row, InputGroup,Button,   ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup} from "react-bootstrap"
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
    console.log("Test "  +  testBuilderTests);
      let sysIndex = systems.map(sys => sys.code).indexOf(testBuilderTests[index].a_system);
      this.setState({selectedSystem: sysIndex});
    } else {
      this.setState({selectedSystem: null});
    }
    setSelectedTestIndex(index);
  };

  handleSubmitButtonClick = () => {
    const {testBuilderTests, selectedTestIndex, testNamesForDropdown, systems, submitCurrentTest} = this.props;
    let test = {...testBuilderTests[selectedTestIndex]};
    let id = testNamesForDropdown[selectedTestIndex].test_id;
    let currentStands = test.stands.map(stand => stand.label);
    test.a_system = systems[this.state.selectedSystem].code;
    test.stands = currentStands;
    submitCurrentTest({test, id});
  };

  renderSearches = () => {
    // const searchMarker = this.props.chainMarkers.map((test, index) => {
    //   return {label: test, value: index}
    // });
    // console.log(this.props.testNamesForDropdown);
    // const searchOpt = this.props.testNamesForDropdown.map((test, index) => {
    //   return {label: test.test_name, value: index}
    // });
    const searchOpt2 = this.props.testNamesForDropdown;
    // console.log("drop2 " + this.props.tests);
    const tests = this.props.tests || [];
    const selectedChainTemplateTests = this.props.selectedChainTemplate.tests || [];
    const filteredTests = tests.filter(t => {
      const testInChain = selectedChainTemplateTests.find((element) => {
        return element.id === t.test_id
      });
      return !testInChain
    });
    const searchOpt = filteredTests.map((test) => {
      return {label: test.test_name, value: test}
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
      searchBarSwitcher()
    ];
  };

  render() {
    const tests = this.props.tests || [];
    const selectedChainTemplateTests = this.props.selectedChainTemplate.tests || [];
    const filteredTests = tests.filter(t => {
      const testInChain = selectedChainTemplateTests.find((element) => {
        return element.id === t.test_id
      });
      return !testInChain
    });
    // const options = filteredTests.map((test) => {
    //   return {label: test.test_name, value: test}
    // });
    return [
      <ol>
        <Toolbar
          style={{marginLeft: 10}}
          additionalElement={this.renderSearches()}
        />
        {/*<SearchBar*/}
          {/*options={options}*/}
          {/*onOptionClick={this.props.testBlockClicked}*/}
        {/*/>*/}
        {filteredTests.map((test, idx) => {
          return (
            <div className='use-test-button' onClick={() => {
              this.props.testBlockClicked(test)
            }} key={idx}>
              <TestBlock id={test.test_id} name={test.test_name} description="" showArrow={false}/>
            </div>
          )
        })}
      </ol>
    ]
  }
}

export default TestsList
