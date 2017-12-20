import React from "react"
import {ListGroup, ListGroupItem} from 'react-bootstrap'

import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, selectChainTemplate}) => {
    return (<ListGroup>
        {
            chainTemplates.map((chain, index) => {
                return <ListGroupItem
                          className='chain-list-item'
                          href="#" active={index===selectedChainTemplate}
                          onClick={() => selectChainTemplate(index)}>
                          {chain.name}
                          </ListGroupItem>
            })
        }
    </ListGroup>);

}
export default ChainList;
