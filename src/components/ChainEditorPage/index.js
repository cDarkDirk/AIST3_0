import React from 'react'
import ChainDisplay from '../../containers/ChainDisplay'
import SideBar from "../SideBar"
import ChainTemplatePropertyEditor from '../ChainTemplatePropertyEditor'
import ChainList from "../../containers/ChainList"
import {Row, Col} from "react-bootstrap"
import TestsList from "../../containers/TestsList"
import {Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import './style.css'

class ChainEditorPage extends React.Component {

    componentDidMount(){
        this.props.fetchChainTemplates();
    }

    render() {
        const {chainTemplate, chainTemplateNameChanged, deleteChainTemplate, addChainTemplate} = this.props
        return (<div className='container'>
            <h1>Chain Editor</h1>
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
                      deleteChainTemplate={deleteChainTemplate}/>
                    <ChainDisplay chainTemplate={chainTemplate}/>
                </Col>
                <Col md={3}>
                    <TestsList/>
                </Col>
            </Row>

        </div>
        )
    }
}
export default ChainEditorPage
