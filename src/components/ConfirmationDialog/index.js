import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {confirmable} from 'react-confirm'



const ConfirmationDialog = ({show, proceed, dismiss, cancel, confirmation}) => {
  return (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {confirmation?confirmation:'Are you sure?'}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={cancel}>Abort</Button>
        <Button onClick={proceed} bsStyle="danger">Delete</Button>
      </Modal.Footer>

    </Modal.Dialog>
  </div>)};

export default confirmable(ConfirmationDialog)
