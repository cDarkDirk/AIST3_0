import React,{Component} from 'react';
import {Col, Form, FormControl, FormGroup, InputGroup, ListGroupItem, Row} from "react-bootstrap";
import Panel from "react-bootstrap/es/Panel";
import DropdownList from "../DropdownList/index";
import Select from 'react-select';
import {setTooltip} from '../../globalFunc';

import './style.css'

class TestParamsForm extends Component {
  render(){
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
                                 onChange={(event) => this.props.handleInputChange(event.target.value, 'test_name')}
                                 placeholder='Введите имя теста...'
                                 type="text"/>
                    <InputGroup.Button>
                      <DropdownList
                        id={'asSelector' + testBuilderTests[selectedTestIndex].test_name}
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
                      id={'stands' + testBuilderTests[selectedTestIndex].test_name}
                      multi={true}
                      wrapperStyle={{zIndex: '1', position: 'relative'}}
                      options={stands.length > 0 ? stands : []}
                      onChange={(stands) => testStandsInputChange(stands)}
                      placeholder='Выберите стенд(ы) для теста...'
                      style={{borderRadius: '0 4px 4px 0'}}
                      value={testBuilderTests[selectedTestIndex].stands}
                      searchable={true}
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
                                 placeholder='Введите URL Jenkins...'
                                 onChange={(event) => this.props.handleInputChange(event.target.value, 'uri')}
                                 type="text"/>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Login</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.login}
                                 style={{zIndex: '0', position: 'relative'}}
                                 placeholder='Введите login Jenkins...'
                                 onChange={(event) => this.props.handleInputChange(event.target.value, 'login')}
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
                                 placeholder='Введите имя Job...'
                                 onChange={(event) => this.props.handleInputChange(event.target.value, 'job_name')}
                                 type="text"/>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Job token/pass</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.passOrToken}
                                 style={{zIndex: '0', position: 'relative'}}
                                 placeholder='Введите Job token/pass...'
                                 onChange={(event) => this.props.handleInputChange(event.target.value, 'passOrToken')}
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
                      arrowRenderer={null}
                      menuRenderer={() => null}
                      autosize={false}
                      menuStyle={{display:'none'}}
                      placeholder='Введите имя тега...'
                      inputProps={{fixcaret: 'fixcaret'}}
                      shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                      promptTextCreator={name => name}
                      onChange={(values) => this.props.handleTagInputChange(values, 'static')}
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
                      placeholder='Введите имя тега...'
                      autosize={false}
                      inputProps={{fixcaret: 'fixcaret'}}
                      shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
                      promptTextCreator={name => name}
                      onChange={(values) => this.props.handleTagInputChange(values, 'dynamic')}
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
  }

}

export default TestParamsForm;
