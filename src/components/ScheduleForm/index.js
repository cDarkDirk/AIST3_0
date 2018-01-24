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
                    <DatePicker selected={props.date} onChange={props.changeDate}></DatePicker>
                </Col>
                <Col>
                    <div> Time</div>
                </Col>
                <Col>
                    <TimePicker value={props.time} onChange={props.changeTime}></TimePicker>
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

            {/*<Row>*/}
                {/*<FormGroup controlId="InputForm">*/}
                {/*<Col componentClass={ControlLabel} sm={2}>*/}
                    {/*{field.label}*/}
                {/*</Col>*/}
                {/*<Col sm={10}>*/}
                    {/*<FormControl value={formValues[field.paramName]} type="input" placeholder="auto"*/}
                                 {/*onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}/>*/}
                {/*</Col>*/}
            {/*</FormGroup>*/}
            {/*</Row>*/}

        </div>
    )
}

export default ScheduleForm;
