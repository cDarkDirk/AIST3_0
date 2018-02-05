import React from 'react'
import {Link} from 'react-router-dom'


export default () => {
  return (
    <div class="form">
      <form class="form-horizontal" role="form" method="POST">
        <div class="form-group">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Логин</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" placeholder="Логин" name="login"/>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Пароль</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" placeholder="Пароль" name="password"/>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <div class="checkbox">
                <label>
                  <input type="checkbox" name="not_attach_ip"/> Не прикреплять к IP (не безопасно)
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <Link to = {'/homepage'}><button type="submit" class="btn btn-default btn-sm">Войти</button></Link>
              <Link to = {'/registration'}><button type="submit" class="btn btn-default btn-sm">Зарегистраироваться</button></Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
