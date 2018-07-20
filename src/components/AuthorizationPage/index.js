import React from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal
} from 'react-bootstrap'
import Notifications, {error} from 'react-notification-system-redux';
import {isUserLoggedIn} from '../../globalFunc';
import BrowserAlert from '../../containers/BrowserAlert'

const divAlert=(<p>Напишите запрос по электронной почте на адрес <a href="mailto:SBT-Ogoltcov-AA1@mail.ca.sbrf.ru">Огольцова Андрея Алексеевича</a></p>);

class AuthorizationPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowBlock = this.handleShowBlock.bind(this);


    this.state = {
      show: false,
      showAlert: false
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }

  handleShowBlock() {
    this.setState(prev => ({ showAlert: !prev.showAlert }));
  }


  componentWillMount(){
    if (isUserLoggedIn()){
      window.location.hash = '#/homepage';
    }
  }

  state = {
    login: "",
    password: "",
  };

  ChangeLP(payload) {
    if (payload.key === "name") {
      this.setState({login: payload.value})
    }
    if (payload.key === "password") {
      this.setState({password: payload.value})
    }
  }

  handleEnterKeyPress = (event) => {
    if (event.keyCode === 13){
      this.HandleLoginButtonCLick();
    }
  };

  HandleLoginButtonCLick() {
    const {loginPasswordChange, loginButtonClicked} = this.props;
    loginPasswordChange({value: this.state.login, key: "name"});
    loginPasswordChange({value: this.state.password, key: "password"});
    loginButtonClicked(this.state)
  }

  render() {
    return (
      <div onKeyDown={this.handleEnterKeyPress} className="form">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>
                Авторизация
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BrowserAlert/>
              <Form horizontal>
                <FormGroup controlId="formHorizontalLogin">
                  <Col componentClass={ControlLabel} sm={2}>
                    Логин
                  </Col>
                  <Col sm={10}>
                    <FormControl className="form-control"
                                 type="text"
                                 value={this.state.login}
                                 onChange={e => this.ChangeLP({value: e.target.value, key: "name"})}
                                 label="Логин"
                                 placeholder="Введите логин"/>
                  </Col>
                </FormGroup>


                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Пароль
                  </Col>
                  <Col sm={10}>
                    <FormControl className="form-control"
                                 type="password"
                                 value={this.state.password}
                                 onChange={e => this.ChangeLP({value: e.target.value, key: "password"})}
                                 label="Пароль"
                                 placeholder="Введите пароль"/>
                  </Col>
                </FormGroup>
              </Form>
              <Button className="pull-right" onClick={this.handleShow}>
               Забыли пароль?
              </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title><strong>Восстановление пароля</strong></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Чтобы восстановить пароль, необходимо:</p>
                    <br/>
                    <li type="square">Оформить заявку в Jira(альфа) SD АИСТ: <a href='http://jira.ca.sbrf.ru/secure/CreateIssueDetails!init.jspa?pid=19902&issuetype=3&priority=3&customfield_17814=21315&summary=%D0%92%D0%BE%D1%81%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%B0%D1%80%D0%BE%D0%BB%D1%8F%20%D0%90%D0%98%D0%A1%D0%A2%203&components=78201&assignee=SBT-Ogoltcov-AA&labels=%D0%90%D0%98%D0%A1%D0%A2' target='_blank'>Оформить</a></li>
                    <br/>
                    <br/>
                    <li type="square">Нет Jira? <a href="#" onClick={this.handleShowBlock} data-toggle="collapse">нажмите сюда</a></li>
                    {this.state.showAlert ? divAlert : null}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Закрыть</Button>
                  </Modal.Footer>
                </Modal>
                <div className="clearfix"/>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-default btn-sm"
                onClick={() => this.HandleLoginButtonCLick()}
              >Войти</Button>
              <Link to={'/registration'}>
                <Button type="submit" className="btn btn-default btn-sm">Регистрация</Button>
              </Link>
            </Modal.Footer>
          </Modal.Dialog>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default AuthorizationPage;
