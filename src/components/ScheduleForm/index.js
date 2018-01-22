import React from "react";
import {Row, Col, Grid, FormControl, FormGroup, ControlLabel, Form, Checkbox, Button, Dropdown} from "react-bootstrap"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import {Jumbotron} from 'react-bootstrap'



const ScheduleForm = function (props) {
  return (
      <Jumbotron>
        <div>
            <Row>
              <FormGroup controlId="formHorizontalInput">
                <Col componentClass={ControlLabel} sm={2}>
                  <div>Amount of times: </div>
                </Col>
                <Col sm={1}>
                  <FormControl value={props.amountOfTimes} type="input" onChange={(e) => props.changeAmountOfTimes(e.target.value)}/>
                </Col>


                <Col componentClass={ControlLabel} sm={2}>
                  Date
                </Col>

                <Col sm={3}>
                  <div>
                    <DatePicker onChange={props.changeDate}
                                selected={props.date}></DatePicker>
                  </div>
                </Col>


                <Col componentClass={ControlLabel} sm={2}>
                  Time
                </Col>

                <Col sm={2}>
                  <div>
                    <TimePicker value={props.time} onChange={props.changeTime}></TimePicker>
                  </div>
                </Col>

                {/*<Col componentClass={ControlLabel} sm={2}>*/}
                  {/*Periodic:*/}
                {/*</Col>*/}
                {/*<Col sm={10}>*/}
                  {/*<FormControl componentClass="select"*/}

                               {/*type="input" placeholder="auto"*/}
                    {/*//                    onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}*/}
                  {/*>*/}
                    {/*{this.props.dataTemplates.map((op, idx) => (<option key={idx} value={op}>{op.template_name}</option>))}*/}
                  {/*</FormControl>*/}
                {/*</Col>*/}

              </FormGroup>
            </Row>
        </div>
      </Jumbotron>
    )
}

export default ScheduleForm;
