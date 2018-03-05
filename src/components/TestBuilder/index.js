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
  Modal
} from 'react-bootstrap'
import 'react-select/dist/react-select.css'
import Select from 'react-select'
import Notifications from 'react-notification-system-redux'
import Header from "../Header";

class TestBuilderPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

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
    const {
      notifications,
      testBuilderTests,
      selectedTestIndex,
      setSelectedTestIndex,
      testNamesForDropdown,
      addNewTest,
      submitCurrentTest,
      owner
    } = this.props;
    const testsList = () => (testNamesForDropdown.map((test, index) =>
      <ListGroupItem
        onClick={() => setSelectedTestIndex(index)}
        active={index === selectedTestIndex}
        key={index}
      >
        {test.test_name}
        &nbsp;
        &nbsp;
        {testBuilderTests[index].modified && <Label bsStyle="warning">Modified</Label>}
        {testBuilderTests[index].new && <Label bsStyle="primary">New</Label>}
      </ListGroupItem>));

    const submitButton = [
      <Button className="pull-left" onClick={this.handleShow}>
        <Glyphicon glyph='glyphicon glyphicon-question-sign'/>
      </Button>,<Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Конструктор тестов</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Чтобы редактировать тест, необходимо:</p>
          <li type="square">Выбрать тест из списка слева</li>
          <li type="square">Заполнить необходимые параметры теста в форме справа</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
          <br/>
          <p>Чтобы создать тест, необходимо:</p>
          <li type="square">Нажать кнопку Add new test</li>
          <li type="square">Заполнить необходимые параметры теста в форме справа</li>
          <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>,
      <Button
        bsStyle="success"
        bsSize="large"
        className="pull-right"
        disabled={!(selectedTestIndex !== null && (testBuilderTests[selectedTestIndex].modified || testBuilderTests[selectedTestIndex].new))}
        onClick={()=> submitCurrentTest({
          test: testBuilderTests[selectedTestIndex],
          id: testNamesForDropdown[selectedTestIndex].test_id
        })}
      >
        SUBMIT
      </Button>,
      <div className="clearfix"/>
    ];

    return (
      <div>
        <Header owner={owner}/>
        <Panel header={submitButton} bsStyle="primary">
          <Grid fluid={true}>
            <Row>
              <Col md={3}>
                <Button
                  bsStyle="primary"
                  className='btn-block'
                  onClick={() => addNewTest()}
                >
                  <Glyphicon glyph='glyphicon glyphicon-plus'/> Add new test...
                </Button>
                <ListGroup>
                  {testsList()}
                </ListGroup>
              </Col>
              <Col md={9}>
                {selectedTestIndex !== null && this.renderTestParamsForm()}
              </Col>
            </Row>
          </Grid>
        </Panel>
        <Notifications notifications={notifications}/>
      </div>
    )
  }

}

export default TestBuilderPage
