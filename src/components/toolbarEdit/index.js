import React from 'react'
import {Button, ButtonGroup, ButtonToolbar, Col, Glyphicon, Row,} from "react-bootstrap";

class ToolbarEdit extends React.Component {
  render() {
    const {
      onSubmit,
      submitDisabled,
      style,
      link,
      setVisible,
      redirDisabled
    } = this.props;

    const submitBtn = (
      <Button bsStyle={'success'} disabled={submitDisabled} onClick={onSubmit}>
        <Glyphicon glyph='glyphicon glyphicon-floppy-disk'/> Сохранить изменения
      </Button>
    );
    const redirectBtn = [
      <Button style={{
        border: '1px solid rgb(69,122,140)',
        backgroundColor: 'rgb(69,122,140)',
        color: '#FFF',
      }} href={link} disabled={redirDisabled}>
        <Glyphicon glyph='glyphicon glyphicon-wrench'/> Редактор формы
      </Button>
    ];
    return (
      <div style={{
        ...style,
        visibility: setVisible,
        position: 'relative',
        padding: 5,
      }}>
        <Row>
          <Col md={12}>
            <ButtonToolbar>
              <ButtonGroup style={{
                position: 'relative',
                float: 'right',
              }}>
                {onSubmit && submitBtn}
              </ButtonGroup>
              <ButtonGroup>
                {link && redirectBtn}
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ToolbarEdit
