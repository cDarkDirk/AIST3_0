import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Button, FormGroup, FormControl, InputGroup} from 'react-bootstrap'

class AuthorizationPage extends React.Component {

  render() {
    const  {paramNames, loginButtonClicked, loginPasswordChange} = this.props;
    console.log(paramNames);
    return (
      <div class="form">
        <form class="form-horizontal" role="form" method="POST">
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
                    onChange={e => loginPasswordChange(e.target.value)}/>
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
                    onChange={e => loginPasswordChange(e.target.value)}/>
                </InputGroup>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                  <button
                    type="submit"
                    class="btn btn-default btn-sm"
                    onClick={() => loginButtonClicked(paramNames)}
                  >Log in</button>
                <Link to={'/registration'}>
                  <Button type="submit" class="btn btn-default btn-sm">Registration</Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

// export default () => {
//   return (
//     <div class="form">
//       <form class="form-horizontal" role="form" method="POST">
//         <div class="form-group">
//           <div class="form-group">
//             <label for="inputEmail3" class="col-sm-2 control-label">Логин</label>
//             <div class="col-sm-10">
//               <input type="text" class="form-control" placeholder="Логин" name="login"/>
//             </div>
//           </div>
//           <div class="form-group">
//             <label for="inputPassword3" class="col-sm-2 control-label">Пароль</label>
//             <div class="col-sm-10">
//               <input type="password" class="form-control" placeholder="Пароль" name="password"/>
//             </div>
//           </div>
//           <div class="form-group">
//             <div class="col-sm-offset-2 col-sm-10">
//               <Link to = {'/homepage'}><button type="submit" class="btn btn-default btn-sm">Войти</button></Link>
//               <Link to = {'/registration'}><button type="submit" class="btn btn-default btn-sm">Зарегистраироваться</button></Link>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }
}

export default AuthorizationPage;

