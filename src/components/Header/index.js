import React from "react";
import "./style.css";
import {Thumbnail, Row, Col, Button} from 'react-bootstrap';
import {onUserLogOut, forceLogin, getUserName} from '../../globalFunc';
import Home from '../../assets/home.png';

class Header extends React.Component {

  static logOut(){
    onUserLogOut();
    forceLogin();
  }

  render() {
    return (
      <div className='header'>
        <div className='homepage-button'>
          <Thumbnail href="#/HomePage" src={Home}/>
        </div>
        <div className='text'>
          Привет, {getUserName()}!
        </div>
        <div className='exit-button'>
          <Button onClick={Header.logOut}>Выход</Button>
        </div>
      </div>
    )
  }
}

export default Header;
