import React from 'react'
import ChainDisplay from '../../containers/ChainDisplay'
import SideBar from "../SideBar"
import ChainTemplatePropertyEditor from '../ChainTemplatePropertyEditor'
import ChainList from "../../containers/ChainList"
import {Row, Col, Glyphicon} from "react-bootstrap"
import TestsList from "../../containers/TestsList"
import {Button} from 'react-bootstrap'
import Notifications from 'react-notification-system-redux'
import FontAwesome from 'react-fontawesome'

import './style.css'

class ChainEditorPage extends React.Component {

    componentDidMount(){
        this.props.fetchChainTemplates();
    }

    render() {
        const {chainTemplate, chainTemplateNameChanged, deleteChainTemplate,
            addChainTemplate, updateChainTemplate, notifications, chainTemplateMarkerChanged} = this.props;
        return (<div className='container'>
            <Row>
              <Col md={11}>
                <h1>Chain Editor</h1>
              </Col>
              <Col md={1}>
                <Button bsStyle="primary">Special for Lontiy<Glyphicon glyph="glyphicon glyphicon-arrow-right"/></Button>
              </Col>
            </Row>

            <Row>
                <Col md={3}>
                    <SideBar>
                      <ChainList name={this.props.match.params.item}/>
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
