import React from "react";
import {
  Panel,
  Grid,
  DropdownButton,
  MenuItem,
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
} from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import Notifications from 'react-notification-system-redux';

class TestBuilderPage extends React.Component {

  componentDidMount() {
    this.props.getTests();
  }

  handleInputChange(value, param) {
    const toPayload = {
      paramValue: value,
      paramName: param,
    };
    this.props.testBuilderFormInputChanged(toPayload);
  }

  renderTestParamsForm = () => {
    const {testBuilderTests, selectedTestIndex} = this.props;
    return (
      <Form>
        <ListGroupItem bsStyle="success" style={{maxHeight: '550px', overflow: 'auto'}}>
          <FormGroup>
            <Panel header={'Test parameters:'}>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Name</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].test_name}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'test_name')}
                                 type="text"/>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Id</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].test_id}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'test_id')}
                                 type="text"/>
                  </InputGroup>
                </Col>
              </Row>
            </Panel>
            <Panel header={'Job Trigger setup:'}>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Jenkins URL</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.uri}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'uri')}
                                 type="text"/>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Jenkins login</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.login}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'login')}
                                 type="text"/>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Job name</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.job_name}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'job_name')}
                                 type="text"/>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Addon>Job token/pass</InputGroup.Addon>
                    <FormControl value={testBuilderTests[selectedTestIndex].job_trigger.passOrToken}
                                 onChange={(event) => this.handleInputChange(event.target.value, 'passOrToken')}
                                 type="text"/>
                  </InputGroup>
                </Col>
              </Row>
            </Panel>
            <Panel header={'Test tags:'}>
              <Row>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>#Tags</InputGroup.Addon>
                    <Select.Creatable
                      multi={true}
                      options={testBuilderTests[selectedTestIndex].tag_names.map((name) => ({
                        label: name,
                        value: name,
                      }))}
                      menuStyle={{display: 'none'}}
                      arrowRenderer={null}
                      autosize={false}
                      onChange={(values) => this.handleInputChange(values, 'tag_names')}
                      value={testBuilderTests[selectedTestIndex].tag_names}
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
    const {notifications, testBuilderTests, selectedTestIndex, setSelectedTestIndex, testNamesForDropdown} = this.props;
    const testsDropdown = [
      <DropdownButton
        id='testSelector'
        onSelect={(testIndex) => setSelectedTestIndex(testIndex)}
        title={selectedTestIndex !== null ? testNamesForDropdown[selectedTestIndex] : 'Select one...'}
        bsStyle="success"
      >
        {testNamesForDropdown.map((test, index) => {
          return (
            <MenuItem active={index === selectedTestIndex} key={index} eventKey={index}>
              {test}
              &nbsp;
              {testBuilderTests[index].modified && <Label bsStyle="warning">Modified</Label>}
            </MenuItem>
          )
        })}
      </DropdownButton>,
      <span style={{marginLeft: '20px'}}>
      {selectedTestIndex !== null && testBuilderTests[selectedTestIndex].modified && <Label bsStyle="warning">Modified</Label>}
      </span>
    ];

    const submitButton = [<Button bsStyle="success" bsSize="large" className="pull-right">SUBMIT DUMMY</Button>,
      <div className="clearfix"/>];

    return (
      <div>
        <Panel header={testsDropdown} footer={submitButton} bsStyle="primary">
          <Grid fluid={true}>
            {selectedTestIndex !== null && this.renderTestParamsForm()}
          </Grid>
        </Panel>
        <Notifications notifications={notifications}/>
      </div>
    )
  }

}

export default TestBuilderPage
