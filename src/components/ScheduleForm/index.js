import React from "react";
import {Row, Col} from "react-bootstrap"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const ScheduleForm = function (props) {
    return (
        <div>
            <h2>
                Schedule
            </h2>
            <Row>
                <Col>
                    <div>Amount of times</div>
                </Col>
                <Col>
                    <input></input>
                </Col>
                <Col>
                    <div>Date</div>
                </Col>
                <Col>
                    <DatePicker></DatePicker>
                </Col>
                <Col>
                    <div> Time</div>
                </Col>
                <Col>
                    <TimePicker></TimePicker>
                </Col>
                <Col>
                    <div> Periodic</div>
                </Col>
                <Col> <select>
                    <option>Once</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                </select></Col>
            </Row>
        </div>
    )
}

export default ScheduleForm;