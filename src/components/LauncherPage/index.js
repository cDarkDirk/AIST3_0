import React from "react";
import {Row, Col} from "react-bootstrap"
import ScheduleForm from "../../containers/ScheduleForm";


const LauncherPage = function (props) {
    return (
        <div className="container">
            <ScheduleForm></ScheduleForm>

            <h2>
                Templates
            </h2>
            <Row>
                <Col>
                    <div> Date</div>
                </Col>
                <Col>
                    <div> Time</div>
                </Col>
                <Col>
                    <div> Periodic Dropdown</div>
                </Col>
            </Row>



        </div>


    )
}

export default LauncherPage;