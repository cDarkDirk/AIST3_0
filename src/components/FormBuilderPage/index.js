import React from 'react';
import {
  Button,
  MenuItem,
  DropdownButton,
  Panel,
  Form,
  ListGroup,
  Grid,
  ButtonGroup,
  Glyphicon,
  Label,
} from 'react-bootstrap';
import Notifications from 'react-notification-system-redux'
import FieldPicker from "../FieldPicker";


class FormBuilderPage extends React.Component {

  state = {
    chainIndex: null,
    inputTypeIndex: 0,
    inputTypes: [
      'Input',
      'DropDown',
      'DatePicker',
    ],
  };

  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  updateFormBuilderChains(field) {
    const fieldToAdd = {
      field,
      idx: this.state.chainIndex,
    };
    this.props.addField(fieldToAdd);
  }


  handleInputAdd = () => {
    const {
      inputTypes,
      inputTypeIndex
    } = this.state;
    switch (inputTypes[inputTypeIndex]) {
      case 'Input': {
        this.updateFormBuilderChains(
          {
            label: "default",
            paramName: "default",
            regEx: '',
            type: inputTypes[inputTypeIndex],
          }
        );
        break;
      }
      case 'DropDown': {
        this.updateFormBuilderChains(
          {
            label: "default",
            paramName: "default",
            type: inputTypes[inputTypeIndex],
            dropDownOptions: [],
          });
        break;
      }
      case 'DatePicker': {
        this.updateFormBuilderChains(
          {
            label: "default",
            paramName: "default",
            type: inputTypes[inputTypeIndex],
          });
        break;
      }
      default: console.log('UNEXPECTED FIELD TYPE!');
    }
  };

  onFieldRemove = (idx) => {
    const indx = this.state.chainIndex;
    const result = {
      fieldIdx: idx,
      chainIdx: indx,
    };
    this.props.removeField(result);
  };

  onFieldsUpdate = (fields) => {
    const updFields = {
      fields,
      idx: this.state.chainIndex,
    };
    this.props.updateFieldsValues(updFields);
  };

  renderFormBody = () => {
    const {formBuilderChains} = this.props;
    const {chainIndex, inputTypeIndex, inputTypes} = this.state;

    return (
      <div>
        <Form>
          <ListGroup style={{maxHeight: '400px', overflow: 'auto'}}>
            <FieldPicker
              onChange={this.onFieldsUpdate}
              fields={formBuilderChains[chainIndex].fields}
              odx={0}
              onFieldRemove={this.onFieldRemove}
            />
          </ListGroup>
        </Form>
        <ButtonGroup>
          <DropdownButton
            dropup={true}
            id='chainSelector'
            onSelect={(inputTypeIndex) => this.setState({inputTypeIndex})}
            title={inputTypes[inputTypeIndex]}
            bsSize="large"
          >
            {inputTypes.map((input, index) => (
              <MenuItem active={index === inputTypeIndex} key={index + 1}
                        eventKey={index}>
                {inputTypes[index]}
              </MenuItem>
            ))}
          </DropdownButton>
          <Button onClick={this.handleInputAdd} bsSize="large" bsStyle="info"><Glyphicon glyph="plus"/></Button>
        </ButtonGroup>
      </div>
    );
  };

  submitChanges = () => {
    const chainName = this.props.formBuilderChains[this.state.chainIndex].name;
    const fields = {fields: this.props.formBuilderChains[this.state.chainIndex].fields};
    const chainIndex = this.state.chainIndex;
    this.props.submit(chainName, fields, chainIndex);
  };

  render() {
    const {formBuilderChains,notifications} = this.props;
    const {chainIndex} = this.state;
    //TODO replace on dropdownSelector
    const chainDropDown = [
      <DropdownButton
        id='chainSelector'
        onSelect={(chainIndex) => this.setState({chainIndex})}
        title={chainIndex !== null ? formBuilderChains[chainIndex].name : 'Select one...'}
        bsStyle="success"
      >
        {formBuilderChains.map((chain, index) => {
          return (
            <MenuItem active={index === chainIndex} key={index} eventKey={index}>
              {chain.name}
              &nbsp;
              {formBuilderChains[index].modified && <Label bsStyle="warning">Modified</Label>}
            </MenuItem>
          )
        })}
      </DropdownButton>,
      <span style={{marginLeft: '20px'}}>
        {chainIndex !== null
        && formBuilderChains[chainIndex].modified
        && <Label bsStyle="warning">Modified</Label>}
        </span>
    ];
    const submitBtn = [
      <Button onClick={this.submitChanges} bsStyle="success" bsSize="large" className="pull-right">Submit</Button>,
      <div className="clearfix"/>
    ];
    return (
      <div>
        <Panel header={chainDropDown} footer={submitBtn} bsStyle="primary">
          <Grid fluid={true}>
            {chainIndex !== null && formBuilderChains[chainIndex] && this.renderFormBody()}
          </Grid>
        </Panel>
        <Notifications notifications={notifications}/>
      </div>
    )
  }
}

export default FormBuilderPage
