import React from "react";
import {Row, Col} from "react-bootstrap"
import ScheduleForm from "../../containers/ScheduleForm";
import Form from "../../containers/Form";
import TemplateForm from "../../containers/TemplateForm";


const LauncherPage = function (props) {
  return (
    <div className="container">
      <Row>
        <ScheduleForm></ScheduleForm>
      </Row>
      <Row>
        <TemplateForm/>
      </Row>
      <Row><Form formName="connectServices"></Form></Row>
    </div>
  )
}

export default LauncherPage;
