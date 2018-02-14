import React from "react"
import {ListGroup, ListGroupItem, Badge} from 'react-bootstrap'

import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, chainSelected, dirtyChainTemplateIndicies, name}) => {
  chainTemplates.map((chain, idx) => {
    if(chain.name === name){
      chainSelected(idx);
    }
  });
  return (<ListGroup>
    {
      chainTemplates.map((chain, idx) => {
        return <ListGroupItem
          key={idx}
          className='chain-list-item'
          href={'/chaineditor/' + chain.name} active={idx === selectedChainTemplate}
          onClick={() => chainSelected(idx)}>
          {chain.name}
          {dirtyChainTemplateIndicies[idx] && <Badge pullRight={true} bsStyle='success'>modified</Badge>}
        </ListGroupItem>
      })
    }
  </ListGroup>);
};
export default ChainList;
