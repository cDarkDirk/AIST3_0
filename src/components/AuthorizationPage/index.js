import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Modal } from 'react-bootstrap'
import validateInput from "./validator";
import Notifications from 'react-notification-system-redux';
import {loginPasswordChange} from "../../actions";



class AuthorizationPage extends React.Component {


  state = {
    login: "",
    password : ""
  };

   ChangeLP(payload){
    if (payload.key === "name"){
      this.setState ({login: payload.value})
    }
     if (payload.key === "password"){
       this.setState ({password: payload.value})
     }
  }

  HandleLoginButtonCLick() {
    const  { loginPasswordChange,loginButtonClicked} = this.props;
    loginPasswordChange({value : this.state.login, key: "name"}),
    loginPasswordChange({value : this.state.password, key: "password"})
    loginButtonClicked(this.state)
  }

  render() {
    // const  {paramNames, loginButtonClicked, loginPasswordChange} = this.props;
    return (
      <div class="form">
        <form>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>
                Authorization
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label for="inputEmail3" class="col-sm-2 control-label">Login</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.login}
                  placeholder="login"
                  onChange={e =>  this.ChangeLP({value : e.target.value, key: "name"})}
                  label="Login"
                  placeholder="Enter login"/></div>
              <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  value={this.state.password}
                  placeholder="password"
                  onChange={e =>  this.ChangeLP({value : e.target.value, key: "password"})}
                  label="Password" placeholder="Enter password"/>
              </div>


            </Modal.Body>
            <Modal.Footer>
              <Button
                class="btn btn-default btn-sm"
                onClick={() => this.HandleLoginButtonCLick()}
              >Log in</Button>
              {/*<Link to={'/registration'}>*/}
                {/*<Button type="submit" class="btn btn-default btn-sm">Registration</Button>*/}
              {/*</Link>*/}
            </Modal.Footer>

          </Modal.Dialog>
        </form>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default AuthorizationPage;
