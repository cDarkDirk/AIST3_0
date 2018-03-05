import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {confirmable} from 'react-confirm'



const NotifyUser = ({show, proceed, dismiss, cancel, confirmation}) => {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {confirmation?confirmation:'oops!'}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={cancel}>Ok</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </div>)};

export default confirmable(NotifyUser)
