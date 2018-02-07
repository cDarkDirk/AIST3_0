import React from 'react'
import LoginForm from './LoginForm'
import {Link} from 'react-router-dom'

class AuthorizationPage extends React.Component{
  render(){
    return(
      <div className="row">
       <div className="col-md-4 col-md-offset-4">
         <LoginForm/>
       </div>

      </div>
    );
  }
}
export default AuthorizationPage;
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
