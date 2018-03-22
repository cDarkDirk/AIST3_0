import React from "react";
import "./style.css";
import {Row, Col, Button} from 'react-bootstrap';
import {onUserLogOut, forceLogin} from '../../globalFunc';

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
          <Button href="#/HomePage">На главную</Button>
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
