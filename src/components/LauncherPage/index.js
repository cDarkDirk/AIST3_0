import React from "react";
import {Row, Col} from "react-bootstrap"
import ScheduleForm from "../../containers/ScheduleForm";
import Form from "../../containers/Form";
import TemplateForm from "../../containers/TemplateForm";


const LauncherPage = function (props) {
    return (
        <div className="container">
            <ScheduleForm></ScheduleForm>

        <TemplateForm/>
            <Row>
                <Col>
                    <div> Date</div>
                </Col>
                <Col>
                    <div> Time</div>
                </Col>              
            </Row>
            <Row>
                <h2>FORM</h2>
            </Row>

            <Row><Form formName="connectServices"></Form></Row>



        </div>


    )
}

export default LauncherPage;
