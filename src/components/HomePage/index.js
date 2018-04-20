import React from 'react'
import {Thumbnail, Grid, Col, Row} from 'react-bootstrap'

import JenkImg from '../../assets/Jenk.png';
import BPM from '../../assets/BPM.png';
import Start from '../../assets/start.png';
import Mock from '../../assets/Mock.PNG';
import Param from '../../assets/Param.png';
import Grafana from '../../assets/grafana.png';

import Notifications from 'react-notification-system-redux';
import Header from "../Header";
import {getUserName, forceLogin} from '../../globalFunc';
import './style.css';

class HomePage extends React.Component {
  componentWillMount () {
    forceLogin();
  }

  render() {
    return (
      <div>
        <Header owner={getUserName()}/>
            <div className={'system-name'}>Автоматизированная Интеграционная Система Тестирования 3.0</div>
            <Grid>
              <Row className={'column'}>
                <Col md={3} className={'menu-element-header'}>
                  <h1 align="middle">Запуск цепочек</h1>
                  <Thumbnail style={{position: 'relative', marginTop: '49px', border:'none'}} href="#/launcher" alt="171x180" src={Start}  />
                </Col>
                <Col md={3}>
                  <h1 align="middle">Конструктор цепочек</h1>
                  <Thumbnail href="#/chaineditor" alt="171x180" src={BPM}  style={{ border:'none'}} />
                </Col>
                <Col md={3}>
                  <h1 align="middle">Добавление тестов</h1>
                  <Thumbnail href="#/testbuilder" alt="171x180" src={JenkImg} style={{ border:'none'}} />
                </Col>
                <Col md={3}>
                  <h1 align="middle">Справочник данных</h1>
                  <Thumbnail href="#/datadirectory" alt="171x180" src={Param} style={{ border:'none'}} />
                </Col>
              </Row>
              <Row style={{marginTop:5}} className={'column'}>
                <Col xs={4} md={4}>
                  <h1 align="middle">Конструктор форм</h1>
                  <Thumbnail href="#/formbuilder" alt="171x180" src={Mock} style={{ border:'none'}} />
                </Col>
                <Col xs={4} md={4} >
                  <h1 align="middle">Ред. шаблонов</h1>
                  <Thumbnail href="#/dataTemplates" alt="171x180" src={Param} style={{ border:'none'}} />
                </Col>
                <Col xs={4} md={4} >
                  <h1 align="middle">Портал статистики</h1>
                  <Thumbnail href="http://sbt-ot-289.ca.sbrf.ru:8069/dashboard/db/obshchaia-statistika" alt="171x180" src={Grafana} style={{ border:'none'}} />
                </Col>
              </Row>
            </Grid>
          <Notifications notifications={this.props.notifications}/>
      </div>
    )

  }
}

export default HomePage;

