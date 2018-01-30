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
    const {dataTemplates, selectedTemplateIndex, onDataTemplatesInputChange} = this.props;

    return (
      <Form>
        <ListGroupItem bsStyle="success" style={{maxHeight: '550px', overflow: 'auto'}}>
          <FormGroup>
            <Panel header={'Template values:'}>
              <Row>
                <InputGroup>
                  <InputGroup.Addon>Template name</InputGroup.Addon>
                  <FormControl value={'bla'}
                               onChange={() => console.log('bla')}
                               type="text"/>
                </InputGroup>
              </Row>
              {
                dataTemplates[selectedTemplateIndex].data.map((entry, index) => (
                    <Row key={index}>
                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Addon>Parameter key</InputGroup.Addon>
                          <FormControl value={entry.key}
                                       onChange={(val) => onDataTemplatesInputChange({name:'key',value: val.target.value,index})}
                                       type="text"/>
                        </InputGroup>
                      </Col>
                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Addon>Parameter value</InputGroup.Addon>
                          <FormControl value={entry.value}
                                       onChange={(val) => onDataTemplatesInputChange({name:'value',value: val.target.value,index})}
                                       type="text"/>
                        </InputGroup>
                      </Col>
                    </Row>
                ))
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
