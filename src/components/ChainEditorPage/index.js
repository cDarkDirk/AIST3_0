import React from 'react'
import ChainDisplay from '../../containers/ChainDisplay'
import SideBar from "../SideBar"
import ChainTemplatePropertyEditor from '../ChainTemplatePropertyEditor'
import ChainList from "../../containers/ChainList"
import {Row, Col, Glyphicon, Modal} from "react-bootstrap"
import TestsList from "../../containers/TestsList"
import {Button} from 'react-bootstrap'
import Notifications from 'react-notification-system-redux'
import FontAwesome from 'react-fontawesome'
import {Link} from "react-router-dom";

import './style.css';

class ChainEditorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }
    componentDidMount(){
        this.props.fetchChainTemplates();
    }

    render() {
        const {chainTemplate, chainTemplateNameChanged, deleteChainTemplate,
            addChainTemplate, updateChainTemplate, notifications, chainTemplateMarkerChanged, chainSelected} = this.props;
        return (
          <div className='container'>
            <Row>
              <Col md={11}>
                <Button onClick={this.handleShow}>
                  <Glyphicon glyph='glyphicon glyphicon-question-sign'/>
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title><strong>Конструктор цепочек</strong></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Чтобы редактировать существующую цепочку, необходимо:</p>
                    <li type="square">Выбрать цепочку из списка слева</li>
                    <li type="square">Выбрать необходимые тесты справа</li>
                    <li type="square">(Опционально) Поменять порядок тестов, перетащив нужный элемент на нужную позицию</li>
                    <li type="square">(Опционально) Изменить имя цепочки в поле Name</li>
                    <li type="square">(Опционально) Изменить маркер цепочки в поле Marker</li>
                    <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
                    <br/>
                    <p>
                      Чтобы создать новую чепочку, необходимо:
                    </p>
                    <li type="square">Нажать кнопку Add new chain template</li>
                    <li type="square">Выбрать необходимые тесты справа</li>
                    <li type="square">Поменять порядок тестов, перетащив нужный элемент на нужную позицию</li>
                    <li type="square">Изменить имя цепочки в поле Name</li>
                    <li type="square">Изменить маркер цепочки в поле Marker</li>
                    <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col md={1}>
                <Link to={'/formbuilder/' + chainSelected}>Редактирование формы<Glyphicon glyph="glyphicon glyphicon-arrow-right"/></Link>
              </Col>
            </Row>
            <div style={{height: '10px'}}/>
            <Row>
                <Col md={3}>
                    <SideBar>
                      <ChainList/>
                      <div className='spacer'/>
                      <Button
                        bsStyle='primary'
                        className='chain-editor-add-chain-btn'
                        onClick={addChainTemplate}>
                        <FontAwesome name='plus'/> Add Chain Template
                      </Button>
                    </SideBar>
                </Col>
                <Col md={6}>
                    <ChainTemplatePropertyEditor
                      chainTemplate={chainTemplate}
                      onNameChange={chainTemplateNameChanged}
                      deleteChainTemplate={deleteChainTemplate}
                      updateChainTemplate={updateChainTemplate}
                      chainTemplateMarkerChanged={chainTemplateMarkerChanged}
                    />

                    <ChainDisplay chainTemplate={chainTemplate}/>
                </Col>
                <Col md={3}>
                    <TestsList/>
                </Col>
            </Row>
                <Notifications notifications={notifications}/>
        </div>
        )
    }
}
export default ChainEditorPage
