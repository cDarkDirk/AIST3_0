import React from "react"
import {
  ListGroup,
  ListGroupItem,
  Label,
} from 'react-bootstrap'
import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, chainSelected}) => {
  return (<ListGroup>
    {
      chainTemplates.map((chain, idx) => {
        return <ListGroupItem
          key={idx}
          className='chain-list-item'
          active={idx === selectedChainTemplate}
          onClick={() => chainSelected(idx)}>
          {chain.name}
          &nbsp;
          &nbsp;
          {chain.modified && <Label bsStyle='warning'>modified</Label>}
          {chain.new && <Label bsStyle='primary'>New</Label>}
        </ListGroupItem>
      })
    }
  </ListGroup>);
};
export default ChainList
