import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import {Link} from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      identifier:'',
      password:'',
      errors:{},
      isLoading:false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onSubmit(e){
    e.preventDefault();
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const {errors, identifier, password, isLoading} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <TextFieldGroup
          field="identifier"
          label="Username"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />
        <div className="form-group">
          <button className="btn btn-primary btn lg" disabled={isLoading}>Login</button>
        </div>
      </form>
    );
  }
}
export default LoginForm;
