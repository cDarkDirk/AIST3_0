import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import Notifications from 'react-notification-system-redux';
import Header from "../Header";

class HomePage extends React.Component {
  render() {
    const {owner} = this.props;
    return (
      <div>
        <Header owner={owner}/>
        <div className='container'>

          <Jumbotron>
            <h1>Home</h1>
            <p><Link to={'/chaineditor'}><Button bsSize="large">Chain editor</Button></Link></p>
            <p><Link to={'/launcher'}><Button bsSize="large">Launcher</Button></Link></p>
            <p><Link to={'/formbuilder'}><Button bsSize="large">Form builder</Button></Link></p>
            <p><Link to={'/testbuilder'}><Button bsSize="large">Test builder</Button></Link></p>
            <p><Link to={'/dataTemplates'}><Button bsSize="large">Data Templates builder</Button></Link></p>
            <p><Link to={'/'}><Button bsSize="large">Exit</Button></Link></p>
          </Jumbotron>
          <Notifications notifications={this.props.notifications}/>
        </div>
      </div>
    )

  }
}

export default HomePage;

