import React from 'react'
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Glyphicon,
  Row,
} from "react-bootstrap";

class Toolbar extends React.Component {
  render() {
    const {
      onNewEntryAdded,
      onDelete,
      help,
      onSubmit,
      submitDisabled,
      style,
      redirText,
      redirDisabled,
      link,
      additionalElement,
      onDuplicate,
    } = this.props;

    const infoBtn = (
      <ButtonGroup>
        <Button bsStyle={'info'} bsSize={'small'} onClick={help}><Glyphicon
          glyph='glyphicon glyphicon-info-sign'/></Button>
      </ButtonGroup>
    );
    const addNewBtn = (
      <Button bsStyle={'primary'} bsSize={'small'} onClick={onNewEntryAdded}>
        <Glyphicon glyph='glyphicon glyphicon-plus-sign'/>
      </Button>);

    const submitBtn = (
      <Button bsStyle={'success'} bsSize={'small'} disabled={submitDisabled} onClick={onSubmit}>
        <Glyphicon glyph='glyphicon glyphicon-floppy-disk'/>
      </Button>
    );
    const deleteBtn = (
      <Button bsStyle={'danger'} bsSize={'small'} onClick={onDelete}>
        <Glyphicon glyph='glyphicon glyphicon-trash'/>
      </Button>
    );
    const redirectBtn = [
      <Button
        style={{
          backgroundColor:'#abee97'
        }}
        disabled={redirDisabled}
        href={link}>{redirText}</Button>
    ];
    const duplicateBtn = [
      <Button bsStyle={'primary'} bsSize={'small'} onClick={onDuplicate}><Glyphicon
        glyph={'glyphicon glyphicon-duplicate'}/></Button>
    ];

    return (
      <div style={{
        ...style,
        position: 'relative',
        backgroundColor: '#EEE',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid #CCC',
        borderRadius: 3,
        marginLeft: -5,
        marginTop: 5,
        padding: 10
      }}>
        <Row>
          <Col md={12}>
            <ButtonToolbar>
              {help && infoBtn}
              <ButtonGroup>
                {onNewEntryAdded && addNewBtn}
                {onDuplicate && duplicateBtn}
                {onSubmit && submitBtn}
              </ButtonGroup>
              <ButtonGroup>
                {onDelete && deleteBtn}
              </ButtonGroup>
              <ButtonGroup className='pull-right'>
                {link && redirectBtn}
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
        <div style={{height: '10px'}}/>
        {additionalElement && additionalElement}
      </div>
    )
  }
}

export default Toolbar
