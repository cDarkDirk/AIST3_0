import React from "react"
import {ListGroup, ListGroupItem, Badge} from 'react-bootstrap'

import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, chainSelected, dirtyChainTemplateIndicies}) => {
  return (<ListGroup>
    {
      chainTemplates.map((chain, idx) => {
        return <ListGroupItem
          key={idx}
          className='chain-list-item'
          active={idx === selectedChainTemplate}
          onClick={() => chainSelected(idx)}>
          {chain.name}
          {dirtyChainTemplateIndicies[idx] && <Badge pullRight={true} bsStyle='success'>modified</Badge>}
        </ListGroupItem>
      })
    }
  </ListGroup>);
}
export default ChainList;
