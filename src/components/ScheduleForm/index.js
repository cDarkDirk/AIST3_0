import React from "react"
import {
  Row,
  Col,
  FormControl,
  FormGroup,
  ControlLabel,
} from "react-bootstrap"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
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
                                selected={props.date}/>
                  </div>
                </Col>


                <Col componentClass={ControlLabel} sm={2}>
                  Time
                </Col>

                <Col sm={2}>
                  <div>
                    <TimePicker value={props.time} onChange={props.changeTime}/>
                  </div>
                </Col>

              </FormGroup>
            </Row>
        </div>
      </Jumbotron>
    )
}

export default ScheduleForm;
