import React from 'react'
import {Link} from 'react-router-dom'


export default () => {
  return (
    <div class="form">
      <form class="form-horizontal" role="form" method="POST">
        <div class="form-group">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Login</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" placeholder="Login" name="login"/>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" placeholder="Password" name="password"/>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Confirm password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" placeholder="Confirm password" name="confirmPassword"/>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <Link to = {'/'}><button type="submit" class="btn btn-default btn-sm">Create account</button></Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
