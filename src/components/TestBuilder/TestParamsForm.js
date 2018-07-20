import React, {Component} from 'react';
import {Col, Form, FormControl, FormGroup, InputGroup, ListGroupItem, Row} from "react-bootstrap";
import Panel from "react-bootstrap/es/Panel";
import DropdownList from "../DropdownList/index";
import Select from 'react-select';
import {setTooltip} from "../../globalFunc";
import InputField from "./InputField";
import AuthTypeSelector from "./AuthTypeSelector";
import './style.css';

class TestParamsForm extends Component {
  constructor(p, c) {
    super(p, c);
    this.state = {
      authType: 'token',
    }
  }

  handleNavSelect = (authType) => {
    this.setState({authType});
  };

  render() {
    const {testBuilderTests, selectedTestIndex, systems, stands, testStandsInputChange} = this.props;
    return (
      <Form>
        <ListGroupItem bsStyle="success">
          <FormGroup>
            <Panel header={'Параметры теста:'}>
              <Row key={'testParams'}>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Наименование теста</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].test_name}
                                 onChange={(event) => this.props.handleInputChange(event.target.value, 'test_name')}
                                 placeholder='Введите имя теста...'
                                 type="text"/>
                    <InputGroup.Button>
                      <DropdownList
                        id={'asSelectorDropdownList'}
                        options={systems}
                        selLabel={this.props.selectedSystem !== null
                          ? systems[this.props.selectedSystem].code
                          : 'Название АС'}
                        labelKey='code'
                        pullRight
                        noCaret
                        bsStyle={this.props.selectedSystem !== null ? 'success' : 'danger'}
                        tooltip={setTooltip(
                          'asSelectorTooltip' + testBuilderTests[selectedTestIndex].test_name,
                          'Выберите АС для теста')}
                        selectedIndex={this.props.selectedSystem}
                        onSelect={this.props.handleSystemChanges}
                      />
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Доступные стенды</InputGroup.Addon>
                    <Select
                      id={'stands'}
                      multi={true}
                      wrapperStyle={{zIndex: '1', position: 'relative'}}
                      options={stands.length > 0 ? stands : []}
                      onChange={(stands) => testStandsInputChange(stands)}
                      placeholder='Выберите стенд(ы) для теста...'
                      style={{borderRadius: '0 4px 4px 0'}}
                      value={testBuilderTests[selectedTestIndex].stands}
                      searchable={true}
                      noResultsText={'Результаты не найдены'}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Panel>
            <Panel header={'Параметры Jenkins:'}>
              <Row key={'JenkinsParams'}>
                <Col md={12}>
                  <AuthTypeSelector
                    test={testBuilderTests[selectedTestIndex]}
                    authType={this.state.authType}
                    id={'AuthTypeSelector'}
                    onTabSelected={this.handleNavSelect}
                    onInputChange={this.props.handleInputChange}
                  >
                    <Row>
                      <Col md={12}>
                        <InputField label={'Полный URL'}
                                    value={testBuilderTests[selectedTestIndex].job_trigger.job_url}
                                    placeholder={'Введите login Jenkins...'}
                                    onChange={(event) => this.props.handleInputChange(
                                      {key: 'job_url', value: event.target.value},
                                      'job_trigger'
                                    )}
                        />
                      </Col>
                    </Row>
                    <Row style={{marginTop: 10}}>
                      <Col md={6}>
                        <InputField label={'Job name'}
                                    value={testBuilderTests[selectedTestIndex].job_trigger.jobName}
                                    placeholder={'Введите имя Job...'}
                                    onChange={(event) => this.props.handleInputChange(
                                      {key: 'jobName', value: event.target.value},
                                      'job_trigger'
                                    )}
                        />
                      </Col>
                      <Col md={6}>
                        <InputField label={'URL'}
                                    value={testBuilderTests[selectedTestIndex].job_trigger.uri}
                                    placeholder={'Введите URL Jenkins...'}
                                    onChange={(event) => this.props.handleInputChange(
                                      {key: 'uri', value: event.target.value},
                                      'job_trigger'
                                    )}
                        />
                      </Col>
                    </Row>
                  </AuthTypeSelector>
                </Col>
              </Row>
            </Panel>
            <Panel header={'Теги:'}>
              <Row key={'tags'}>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Статические теги</InputGroup.Addon>
                    <Select.Creatable
                      id={'static'}
                      multi={true}
                      options={[]}
                      arrowRenderer={null}
                      menuRenderer={() => null}
                      autosize={false}
                      menuStyle={{display: 'none'}}
                      placeholder='Введите имя тега...'
                      inputProps={{fixcaret: 'fixcaret'}}
                      shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                      promptTextCreator={name => name}
                      onChange={(values) => this.props.handleTagInputChange(values, 'static')}
                      value={testBuilderTests[selectedTestIndex].tag_names.static}
                      style={{borderRadius: '0 4px 4px 0'}}
                      noResultsText={'Результаты не найдены'}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Динамические теги</InputGroup.Addon>
                    <Select.Creatable
                      id={'dynamic'}
                      multi={true}
                      options={[]}
                      menuStyle={{display: 'none'}}
                      arrowRenderer={null}
                      placeholder='Введите имя тега...'
                      autosize={false}
                      inputProps={{fixcaret: 'fixcaret'}}
                      shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                      promptTextCreator={name => name}
                      onChange={(values) => this.props.handleTagInputChange(values, 'dynamic')}
                      value={testBuilderTests[selectedTestIndex].tag_names.dynamic}
                      style={{borderRadius: '0 4px 4px 0'}}
                      noResultsText={'Результаты не найдены'}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Panel>
          </FormGroup>
        </ListGroupItem>
      </Form>
    )
  }

}

export default TestParamsForm;
