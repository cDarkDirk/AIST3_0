import React from "react";
import "./style.css";
import {Row, Col, Button} from 'react-bootstrap';
import {onUserLogOut, forceLogin} from '../../globalFunc';
import {Link} from "react-router-dom";

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
        <div className='text'>
          Привет, {owner}!
        </div>
        <div className='personal-button'>
          <Button onClick={this.logOut}>Выход</Button>
        </div>
        <div  className='exit-button'>
          <Link to={'/personaldata'}> <Button>Личный кабинет</Button></Link>
        </div>
      </div>
    )
  }
}

export default Header;
