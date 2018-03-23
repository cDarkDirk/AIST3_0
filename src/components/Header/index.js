import React from "react";
import "./style.css";
import {Thumbnail, Row, Col, Button} from 'react-bootstrap';
import {onUserLogOut, forceLogin} from '../../globalFunc';
import Home from '../../assets/home.png';


class Header extends React.Component {

  logOut(){
    onUserLogOut();
    forceLogin();
  }

  render() {
    const {
      owner
    } = this.props;
    return (
      <div className='header'>
        <div className='homepage-button'>
          <Thumbnail href="#/HomePage" src={Home}/>
        </div>
        <div className='text'>
          Привет, {owner}!
        </div>
        <div className='exit-button'>
          <Button onClick={this.logOut}>Выход</Button>
        </div>
      </div>
    )
  }
}

export default Header;
