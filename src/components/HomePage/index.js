import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default ({addCounter, counter, goToChainEditor}) => {
  return (
    <div className='container'>
      <Jumbotron>
        <h1>Home</h1>
        <p>Counter: {counter}</p>
        <p><Button onClick={addCounter} bsStyle='primary' bsSize="large">Add to counter</Button></p>
        <p><Button onClick={goToChainEditor} bsSize="large">To Editor</Button></p>
          <Link to={'/form'}>My super link</Link>
      </Jumbotron>
    </div>
  )
}
