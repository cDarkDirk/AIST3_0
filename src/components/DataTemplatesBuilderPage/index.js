import React from 'react';
import {
  Button,
  Col,
  Form, FormControl,
  FormGroup,
  Grid, InputGroup,
  Label,
  ListGroupItem,
  Panel,
  Row,
} from "react-bootstrap";
import Notifications from 'react-notification-system-redux';

class DataTemplatesBuilderPage extends React.Component {

  componentDidMount() {
    this.props.fetchDataTemplates();
  }

  renderTemplateBulder = () => {
    const {dataTemplates, selectedTemplateIndex} = this.props;

    const keys = Object.keys(dataTemplates[selectedTemplateIndex].data);
    const values = Object.values(dataTemplates[selectedTemplateIndex].data);
    const formData = keys.map((key, idx) => {
      let curVal = {};
      curVal[key] = values[idx];
      return curVal;
    });
    //TODO create onUpdate action
    return (
      <Form>
        <ListGroupItem bsStyle="success" style={{maxHeight: '550px', overflow: 'auto'}}>
          <FormGroup>
            <Panel header={'Template values:'}>
              {
                formData.map((value, index) => {
                  return (
                    <Row>
                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Addon>Parameter key</InputGroup.Addon>
                          <FormControl value={keys[index]}
                                       onChange={() => console.log('onChange')}
                                       type="text"/>
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Addon>Parameter value</InputGroup.Addon>
                          <FormControl value={values[index]}
                                       onChange={() => console.log('bla')}
                                       type="text"/>
                        </InputGroup>
                      </Col>
                    </Row>
                  )
                })
              }
            </Panel>
          </FormGroup>
        </ListGroupItem>
      </Form>
    )
  };

  renderTemplatesList() {
    const {dataTemplates, selectedTemplateIndex, onTemplateSelected} = this.props;
    return (dataTemplates.map((template, index) =>
      <ListGroupItem
        onClick={() => onTemplateSelected(index)}
        active={index === selectedTemplateIndex}
        key={index}
      >
        {template.name}
        &nbsp;
        &nbsp;
        {dataTemplates[index].modified && <Label bsStyle="warning">Modified</Label>}
        {dataTemplates[index].new && <Label bsStyle="primary">New</Label>}
      </ListGroupItem>
    ));
  }

  render() {
    return (
      <div>
        <Panel bsStyle='primary' header='Select template or create new'>
          <Grid>
            <Row>
              <Col md={3}>
                {this.renderTemplatesList()}
              </Col>
              <Col md={9}>
                {this.props.selectedTemplateIndex !== null && this.renderTemplateBulder()}
              </Col>
            </Row>
          </Grid>
        </Panel>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default DataTemplatesBuilderPage
