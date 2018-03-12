import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Modal} from 'react-bootstrap'
import Notifications from 'react-notification-system-redux';
import {isUserLoggedIn, onUserLogOut} from '../../globalFunc';


class AuthorizationPage extends React.Component {

  componentWillMount(){
    if (isUserLoggedIn()){
      window.location.hash = '#/homepage';
    }
  }

  state = {
    login: "",
    password: ""
  };

  ChangeLP(payload) {
    if (payload.key === "name") {
      this.setState({login: payload.value})
    }
    if (payload.key === "password") {
      this.setState({password: payload.value})
    }
  }

  HandleLoginButtonCLick() {
    const {loginPasswordChange, loginButtonClicked} = this.props;
    loginPasswordChange({value: this.state.login, key: "name"});
    loginPasswordChange({value: this.state.password, key: "password"});
    loginButtonClicked(this.state)
  }

  render() {

    return (
      <div className="form">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>
                Authorization
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form horizontal>
                <FormGroup controlId="formHorizontalLogin">
                  <Col componentClass={ControlLabel} sm={2}>
                    Login
                  </Col>
                  <Col sm={10}>
                    <FormControl className="form-control"
                                 type="text"
                                 value={this.state.login}
                                 onChange={e => this.ChangeLP({value: e.target.value, key: "name"})}
                                 label="Login"
                                 placeholder="Enter login"/>
                  </Col>
                </FormGroup>


                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl className="form-control"
                                 type="password"
                                 value={this.state.password}
                                 onChange={e => this.ChangeLP({value: e.target.value, key: "password"})}
                                 label="Password"
                                 placeholder="Enter password"/>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-default btn-sm"
                onClick={() => this.HandleLoginButtonCLick()}
              >Log in</Button>
              <Link to={'/registration'}>
                <Button type="submit" className="btn btn-default btn-sm">Registration</Button>
              </Link>
            </Modal.Footer>
          </Modal.Dialog>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default AuthorizationPage;
