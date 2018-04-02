import React from "react";
import "./style.css";
import {Thumbnail, Button} from 'react-bootstrap';
import {onUserLogOut, forceLogin, getUserName, getPersonalPage} from '../../globalFunc';
import Home from '../../assets/home.png';
import {ButtonGroup} from "reactstrap";


class Header extends React.Component {

  static logOut(){
    onUserLogOut();
    forceLogin();
  }

  static getPersonal(){
    getPersonalPage();
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
        <ButtonGroup className='group-button'>
          <Button onClick={Header.getPersonal}>Личный кабинет</Button>
          <Button onClick={Header.logOut}>Выход</Button>
        </ButtonGroup>
      </div>
    )
  }
}

export default Header;
