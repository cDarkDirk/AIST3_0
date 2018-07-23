import React, {Component} from 'react';
import Tabs from "react-bootstrap/es/Tabs";
import Tab from "react-bootstrap/es/Tab";
import Well from "react-bootstrap/es/Well";
import InputField from "./InputField";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import './style.css';

export default (props) => {
  return (
    <Tabs bsStyle={'tabs'}
          justified
          animation={false}
          activeKey={props.authType}
          onSelect={key => props.onTabSelected(key)}
          id={props.id}
          mountOnEnter={true}
          unmountOnExit={true}
    >
      <Tab eventKey={'token'} title={'Авторизация по токену'}>
        <Well style={{borderRadius: '0 0px 4px 4px'}}>
          {props.children && props.children}
          <Row style={props.children ? {marginTop: 10} : {}}>
            <Col md={6}>
              <InputField label={'Job token'}
                          value={props.test.job_trigger.token}
                          placeholder={'Введите Job token...'}
                          onChange={(event) => props.onInputChange(
                            {key: 'token', value: event.target.value},
                            'job_trigger'
                          )}
              />
            </Col>
          </Row>
        </Well>
      </Tab>
      <Tab eventKey={'login'} title={'Авторизация по логину/паролю'}>
        <Well style={{borderRadius: '0 0px 4px 4px'}}>
          {props.children && props.children}
          <Row style={props.children ? {marginTop: 10} : {}}>
            <Col md={6}>
              <InputField label={'Login'}
                          value={props.test.job_trigger.login}
                          placeholder={'Введите login Jenkins...'}
                          onChange={(event) => props.onInputChange(
                            {key: 'login', value: event.target.value},
                            'job_trigger'
                          )}
              />
            </Col>
            <Col md={6}>
              <InputField label={'Password'}
                          value={props.test.job_trigger.password}
                          placeholder={'Введите Job pass...'}
                          onChange={(event) => props.onInputChange(
                            {key: 'password', value: event.target.value},
                            'job_trigger'
                          )}
              />
            </Col>
          </Row>
        </Well>
      </Tab>
    </Tabs>
  )
};
