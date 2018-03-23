import React from "react";
import "./style.css";
import {Button} from 'react-bootstrap';
import {onUserLogOut, forceLogin, getUserName} from '../../globalFunc';

class Header extends React.Component {

  logOut(){
    onUserLogOut();
    forceLogin();
  }

  render() {
    return (
      <div className='header'>
        <div className='text'>
          Привет, {getUserName()}!
        </div>
        <div className='exit-button'>
          <Button onClick={this.logOut}>Выход</Button>
        </div>
      </div>
    )
  }
}

export default Header;
