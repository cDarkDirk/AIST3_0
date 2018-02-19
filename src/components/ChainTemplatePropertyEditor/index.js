import React from 'react'
import {
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import ConfirmationDialog from '../ConfirmationDialog'
import {createConfirmation} from 'react-confirm'
import './style.css'

const confirm = createConfirmation(ConfirmationDialog, 0);


const ChainTemplatePropertyEditor = ({
                                       chainTemplate,
                                       chainTemplateMarkerChanged,
                                       onNameChange,
                                       deleteChainTemplate,
                                       updateChainTemplate,
                                       chainName,
                                     }) => {
  console.log(chainName);
  const deleteChain = () => {
    confirm({confirmation: `Do you really want to delete ${chainTemplate.name}?`}).then(
      () => deleteChainTemplate(chainTemplate),
      () => {
      })
  };

  const disableSubmit = !(chainTemplate.modified || chainTemplate.new);

  return (
    <div>
      <Row>
        <Col md={7}>
          <FormGroup bsSize="large">
            <InputGroup>
              <InputGroup.Addon>Name</InputGroup.Addon>
              <FormControl
                type="text"

                value={chainTemplate.name}
                placeholder="Chain Name"
                onChange={e => onNameChange(e.target.value)}/>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={2}>{chainTemplate ?
          <Button
            className='chain-template-property-editor-button'
            bsStyle='danger'
            onClick={deleteChain}>
            <FontAwesome name='trash'/></Button> : null}</Col>
        <Col md={3}>{chainTemplate ?
          <Button
            className='chain-template-property-editor-button'
            bsStyle='primary'
            disabled={disableSubmit}
            onClick={() => updateChainTemplate({
              name: chainName,
              value: chainTemplate,
            })}>
            <FontAwesome name='floppy-o'/> SUBMIT</Button> : null}</Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup bsSize="large">
            <InputGroup>
              <InputGroup.Addon>Marker</InputGroup.Addon>
              <FormControl
                type="text"
                value={chainTemplate.marker}
                placeholder="Marker"
                onChange={e => chainTemplateMarkerChanged(e.target.value)}/>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    </div>
  )
};

export default ChainTemplatePropertyEditor
