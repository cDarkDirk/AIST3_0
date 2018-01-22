import React from 'react'
import {Row, Col, Button, FormGroup, FormControl, InputGroup} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import ConfirmationDialog from '../ConfirmationDialog'
import {createConfirmation} from 'react-confirm';


import './style.css'

const confirm = createConfirmation(ConfirmationDialog, 0);


const ChainTemplatePropertyEditor = ({chainTemplate, onNameChange, deleteChainTemplate, updateChainTemplate}) => {

  const deleteChain = () => {
    confirm({confirmation: `Do you really want to delete ${chainTemplate.name}?`}).then(
      () => deleteChainTemplate(chainTemplate),
      () => {
      })
  };

  const SubmitChain = () => {
    confirm({confirmation: `Do you really want to submit ${chainTemplate.name}?`}).then(
      () => updateChainTemplate(chainTemplate),
      () => {
      })
  };

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
            onClick={() => updateChainTemplate(chainTemplate)}>
            <FontAwesome name='floppy-o'/> SUBMIT</Button> : null}</Col>
      </Row>
    </div>
  )
};

export default ChainTemplatePropertyEditor
