import React from "react"
import {ListGroup, ListGroupItem, Label} from 'react-bootstrap'

import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, chainSelected, chainNames, name}) => {
  chainTemplates.map((chain, idx) => {
    if(chain.name === name){
      chainSelected(idx);
    }
  });
  return (<ListGroup>
    {
      chainNames.map((chain, idx) => {
        return <ListGroupItem
          key={idx}
          className='chain-list-item'
          href={'/#/chaineditor/' + chain} active={idx === selectedChainTemplate}
          onClick={() => chainSelected(idx)}>
          {chain}
          &nbsp;
          &nbsp;
          {chainTemplates[idx].modified && <Label bsStyle='warning'>modified</Label>}
          {chainTemplates[idx].new && <Label bsStyle='primary'>New</Label>}
        </ListGroupItem>
      })
    }
  </ListGroup>);
};
export default ChainList;
