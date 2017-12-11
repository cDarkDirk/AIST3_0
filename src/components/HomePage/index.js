import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'


export default ({addCounter, counter, goToChainEditor}) => {
  return (
    <div className='container'>
      <Jumbotron>
        <h1>Home</h1>
        <p>Counter: {counter}</p>
        <p><Button onClick={addCounter} bsStyle='primary' bsSize="large">Add to counter</Button></p>
        <p><Button onClick={goToChainEditor} bsSize="large">To Editor</Button></p>
      </Jumbotron>
    </div>
  )
}
