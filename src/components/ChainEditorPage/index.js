import React from 'react'
import TestBlock from '../TestBlock'
import ChainDisplay from '../../containers/ChainDisplay'
import SideBar from "../SideBar"
import ChainList from "../../containers/ChainList"
import Data from "../../assets/chains.json"
import {Row, Col} from "react-bootstrap"

export default () => {
    return (
        <div className='container'>
            <h1>Chain Editor</h1>
            <Row>
                <Col md={3}>
                    <SideBar><ChainList chains={Data}></ChainList></SideBar>
                </Col>
                <Col md ={8}>
                    <ChainDisplay>
                    </ChainDisplay>
                </Col>
                <Col md = {1}>
                </Col>

            </Row>

        </div>
    )
}
