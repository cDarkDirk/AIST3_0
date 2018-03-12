import React from "react";
import Header from "../Header";
import {forceLogin, getUserName} from "../../globalFunc";
import {Button, Jumbotron} from "react-bootstrap";

class PersonalPage extends React.Component {

  componentWillMount () {
    forceLogin();
  }

  render(){
    return(
      <div>
        <Header owner={getUserName()}/>
        <Jumbotron>
          <Button>Создание Группы</Button>
        </Jumbotron>
      </div>
    )
  }
}

export default PersonalPage;
