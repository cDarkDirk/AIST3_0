import React from 'react'
import {Button, ButtonGroup, ButtonToolbar, Col, Glyphicon, Row} from "react-bootstrap";

const Toolbar = (props) => {
  const {onNewEntryAdded, onDelete, help, onSubmit, chainName, chainTemplate} = props;
  return (
    <Row>
      <Col md={12}>
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsStyle={'info'} onClick={help}><Glyphicon glyph='glyphicon glyphicon-info-sign'/></Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button bsStyle={'primary'} onClick={onNewEntryAdded}><Glyphicon glyph='glyphicon glyphicon-plus-sign'/></Button>
            <Button bsStyle={'success'} onClick={() => onSubmit({
              name: chainName,
              value: chainTemplate,
            })}><Glyphicon glyph='glyphicon glyphicon-ok-sign'/></Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button bsStyle={'danger'} onClick={onDelete}><Glyphicon glyph='glyphicon glyphicon-remove-sign'/></Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
    </Row>
  )
};
export default Toolbar
