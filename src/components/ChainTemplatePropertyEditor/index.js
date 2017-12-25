import React from 'react'
import {Row, Col, Button, FormGroup, FormControl, InputGroup} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import ConfirmationDialog from '../ConfirmationDialog'
import { createConfirmation } from 'react-confirm';


import './style.css'

const confirm = createConfirmation(ConfirmationDialog, 0);


const ChainTemplatePropertyEditor = ({chainTemplate, onNameChange, deleteChainTemplate}) => {

  const deleteChain = () => {
    confirm({confirmation: `Do you really want to delete ${chainTemplate.name}?`}).then(
    () => deleteChainTemplate(chainTemplate),
    () => {})
  }

  return (
    <div>
      <Row>
        <Col md={9}>
          <FormGroup bsSize="large">
              <InputGroup>
                <InputGroup.Addon>Name</InputGroup.Addon>
                <FormControl
                  type="text"
                  value={chainTemplate.name}
                  placeholder="Chain Name"
                  onChange={e => onNameChange(e.target.value)} />
              </InputGroup>
          </FormGroup>
        </Col>
        <Col md={3}>{chainTemplate?
          <Button
            className='chain-template-property-editor-button'
            bsStyle='danger'
            onClick={deleteChain}>
            <FontAwesome name='trash'/> Delete
          </Button>:null}</Col>
      </Row>

    </div>
  )
}

export default ChainTemplatePropertyEditor
