import React from "react"
import {ListGroup,
  ListGroupItem,
  Label} from 'react-bootstrap'

import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, chainSelected, chainNamesForDropdown}) => {
  let location = window.location.hash.split('/');
  chainTemplates.map((chain, idx) => {
    if(chain.name === location[2] && selectedChainTemplate !== idx){
      chainSelected(idx);
    }
  });
  return (<ListGroup style={{ maxHeight: '1080px', overflow: 'auto'}}>
    {
      chainNamesForDropdown.map((chain, idx) => {
        return <ListGroupItem
          key={idx}
          className='chain-list-item'
          active={selectedChainTemplate !== null ? idx === selectedChainTemplate : null}
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
