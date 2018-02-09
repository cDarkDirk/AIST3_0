import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Button, FormGroup, FormControl, InputGroup} from 'react-bootstrap'
import validateInput from "./validator";
import Notifications from 'react-notification-system-redux';


class AuthorizationPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const  {paramNames, loginButtonClicked, loginPasswordChange} = this.props;
    // console.log(paramNames);
    return (
      <div class="form">
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <div class="form-group">
              {/*<label for="inputEmail3" class="col-sm-2 control-label">Логин</label>*/}
              <div class="col-sm-10">
                <InputGroup>
                  <InputGroup.Addon>Login</InputGroup.Addon>
                  <FormControl
                    type="text"
                    value={paramNames.name}
                    placeholder="login"
                    onChange={e =>  loginPasswordChange({value : e.target.value, key: "name"})}/>
                </InputGroup>
                {/*<input type="text" class="form-control" placeholder="Логин" name="login"/>*/}
              </div>
            </div>
            <div class="form-group">
              {/*<label for="inputPassword3" class="col-sm-2 control-label">Пароль</label>*/}
              <div class="col-sm-10">
                {/*<input type="password" class="form-control" placeholder="Пароль" name="password"/>*/}
                <InputGroup>
                  <InputGroup.Addon>Passwod</InputGroup.Addon>
                  <FormControl
                    type="password"
                    value={paramNames.password}
                    placeholder="password"
                    onChange={e =>  loginPasswordChange({value : e.target.value, key: "password"})}/>
                </InputGroup>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <Button
                  class="btn btn-default btn-sm"
                  onClick={() => loginButtonClicked(paramNames)}
                >Log in</Button>
                <Link to={'/registration'}>
                  <Button type="submit" class="btn btn-default btn-sm">Registration</Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}


export default AuthorizationPage;

