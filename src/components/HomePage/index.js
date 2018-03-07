import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie';
import Notifications from 'react-notification-system-redux';
import Header from "../Header";
import {getUserName, onUserLogOut, forceLogin} from '../../globalFunc';

class HomePage extends React.Component {
  componentWillMount () {
    forceLogin();
  }

  logOut() {
    onUserLogOut();
    forceLogin();
  }

  render() {
    return (
      <div>
        <Header owner={getUserName()}/>
        <div className='container'>
          <Jumbotron>
            <h1>Home</h1>
            <p><Link to={'/chaineditor'}><Button bsSize="large">Chain editor</Button></Link></p>
            <p><Link to={'/launcher'}><Button bsSize="large">Launcher</Button></Link></p>
            <p><Link to={'/formbuilder'}><Button bsSize="large">Form builder</Button></Link></p>
            <p><Link to={'/testbuilder'}><Button bsSize="large">Test builder</Button></Link></p>
            <p><Link to={'/dataTemplates'}><Button bsSize="large">Data Templates builder</Button></Link></p>
            <p><Button onClick={this.logOut} bsSize="large">Exit</Button></p>
          </Jumbotron>
          <Notifications notifications={this.props.notifications}/>
        </div>
      </div>
    )

  }
}

export default HomePage;
