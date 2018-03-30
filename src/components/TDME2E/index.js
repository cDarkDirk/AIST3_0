import React from 'react'
import {Thumbnail, Grid, Col, Row} from 'react-bootstrap'
import E2E from '../../assets/E2E.png';
import TDM from '../../assets/TDM.png';






import Notifications from 'react-notification-system-redux';
import Header from "../Header";

class TDME2E extends React.Component {
  render() {
    const {owner} = this.props;
    return (
      <div>
        <Header owner={owner}/>
        <div className='container'>

            <h1 align="middle">Автоматизированная Интеграционная Система Тестирования 3.0</h1>

            <Grid>
              <Row>
                <Col xs={4} md={6}>
                  <h1 align="middle">E2E Тестирование</h1>
                  <Thumbnail href="#/HomePage" alt="171x180" src={E2E}  />
                </Col>
                <Col xs={4} md={6}>
                  <h1 align="middle">TDM Создание тестовых данных</h1>
                  <Thumbnail href="#/HomePage" alt="171x180" src={TDM}  />
                </Col>
              </Row>
            </Grid>
          <Notifications notifications={this.props.notifications}/>
        </div>
      </div>
    )

  }
}

export default TDME2E;

