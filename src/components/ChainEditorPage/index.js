import React from 'react'
import ChainDisplay from '../../containers/ChainDisplay'
import SideBar from "../SideBar"
import ChainList from "../../containers/ChainList"
import {Row, Col} from "react-bootstrap"
import TestsList from "../../containers/TestsList"

class ChainEditorPage extends React.Component {

    componentDidMount(){
        this.props.fetchChainTemplates();
    }

    render() {
        return (<div className='container'>
            <h1>Chain Editor</h1>
            <Row>
                <Col md={3}>
                    <SideBar><ChainList/></SideBar>
                </Col>
                <Col md={8}>
                    <ChainDisplay>
                    </ChainDisplay>
                </Col>
                <Col md={1}>
                    <TestsList/>
                </Col>
            </Row>

        </div>
        )
    }
}
export default ChainEditorPage
