import React from 'react'
import {Thumbnail, Image, Button, Jumbotron, Grid, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import JenkImg from '../../assets/Jenk.png';
import BPM from '../../assets/BPM.png';
import Start from '../../assets/start.png';
import Mock from '../../assets/Mock.PNG';
import Param from '../../assets/Param.png';
import Exit from '../../assets/exit.png';





import Notifications from 'react-notification-system-redux';
import Header from "../Header";

class HomePage extends React.Component {
  render() {
    const {owner} = this.props;
    return (
      <div>
        <Header owner={owner}/>
        <div className='container'>

            <h1 align="middle">Автоматизированная Интеграционная Система Тестирования 3.0</h1>

            <Grid>
              <Row>
                <Col xs={4} md={4}>
                  <h1 align="middle">Запуск цепочек</h1>
                  <Thumbnail href="#/launcher" alt="171x180" src={Start}  />
                </Col>
                <Col xs={4} md={4}>
                  <h1 align="middle">Конструктор цепочек</h1>
                  <Thumbnail href="#/chaineditor" alt="171x180" src={BPM}  />
                </Col>

                <Col xs={4} md={4}>
                  <h1 align="middle">Добавление тестов</h1>
                  <Thumbnail href="#/testbuilder" alt="171x180" src={JenkImg}  />
                </Col>
              </Row>
              <Row>
                <Col xs={4} md={4}>
                  <h1 align="middle">Конструктор форм</h1>
                  <Thumbnail href="#/formbuilder" alt="171x180" src={Mock}  />
                </Col>
                <Col xs={4} md={4}>
                  <h1 align="middle">Ред. шаблонов</h1>
                  <Thumbnail href="#/dataTemplates" alt="171x180" src={Param}  />
                </Col>
                <Col xs={4} md={4}>
                  <h1 align="middle">Выход</h1>
                  <Thumbnail href="#/" alt="171x180" src={Exit}  />
                </Col>
              </Row>
            </Grid>
          <Notifications notifications={this.props.notifications}/>
        </div>
      </div>
    )

  }
}

export default HomePage;

