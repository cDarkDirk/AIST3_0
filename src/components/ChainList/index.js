import React from "react"
import {
  ListGroup,
  ListGroupItem,
  Label,
  FormGroup,
  InputGroup,
  FormControl,
  Glyphicon,
} from 'react-bootstrap'
import './style.css'

const ChainList = ({chainTemplates, selectedChainTemplate, chainSelected, chainNames}) => {
  return (
    <ListGroup>
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon><Glyphicon glyph='glyphicon glyphicon-search'/></InputGroup.Addon>
          <FormControl
            type="text"
            placeholder="search for chain template..."
            onChange={() => console.log('searching...')}/>
        </InputGroup>
        <div className="clearfix"/>
      </FormGroup>
    {
      chainNames.map((chain, idx) => {
        return <ListGroupItem
          key={idx}
          className='chain-list-item'
          active={idx === selectedChainTemplate}
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
export default ChainList
