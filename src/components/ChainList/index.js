import React from "react"
import {ListGroup, ListGroupItem} from 'react-bootstrap'

import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, selectChainTemplate}) => {
    return (<ListGroup>
        {
            chainTemplates.map((chain, idx) => {
                return <ListGroupItem
                          key={idx}
                          className='chain-list-item'
                          href="#" active={idx===selectedChainTemplate}
                          onClick={() => selectChainTemplate(idx)}>
                          {chain.name}
                          </ListGroupItem>
            })
        }
    </ListGroup>);

}
export default ChainList;
