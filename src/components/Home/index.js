import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import PropTypes from 'prop-types'

const Home = ({actions, counter}) => {
  return (
    <div className='container'>
      <Jumbotron>
        <h1>Home</h1>
        <p>Counter: {counter}</p>
        <Button onClick={actions.addCounter} bsStyle='primary' bsSize="large">Add to counter</Button>
      </Jumbotron>
    </div>
  )
}

Home.propTypes = {
  counter: PropTypes.number,
  actions: PropTypes.object,
}

export default Home
