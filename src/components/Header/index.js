import React from "react";
import "./style.css";
import {Button, Glyphicon} from 'react-bootstrap';
import {onUserLogOut, forceLogin, getUserName, getPersonalPage} from '../../globalFunc';
import {ButtonGroup} from "reactstrap";


class Header extends React.Component {

  static logOut() {
    onUserLogOut();
    forceLogin();
  }

  static getPersonal() {
    getPersonalPage();
  }
  static getHomepage() {
    window.location.hash = '#/HomePage';
  }

  bla = () => {
    const f = (
      <ButtonGroup className='group-button'>
        <Button onClick={Header.getPersonal}>Личный кабинет</Button>
        <Button onClick={Header.logOut}>Выход</Button>
      </ButtonGroup>)
  };

  render() {
    return (
      <div className='header'>
        <div className='home-btn'>
          <button onClick={Header.getHomepage}><Glyphicon glyph='glyphicon glyphicon-home'/></button>
        </div>
        <div className='text'>
          Привет, {getUserName()}!
        </div>
        <div className='bar-buttons'>
          <button onClick={Header.getPersonal}><Glyphicon glyph='glyphicon glyphicon-user'/></button>
          <button onClick={Header.logOut}><Glyphicon glyph='glyphicon glyphicon-log-out'/></button>
        </div>
      </div>
    )
  }
}

export default Header;
