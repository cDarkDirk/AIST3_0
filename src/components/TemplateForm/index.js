import React from 'react'
import {fetchDataTemplatesList} from "../../api";
import {
  Jumbotron,
  Row,
  Col,
  Grid,
  FormControl,
  FormGroup,
  ControlLabel,
  Form,
  Checkbox,
  Button,
  Dropdown
} from "react-bootstrap"
import Select from 'react-select';


const TemplateForm = function (props) {
  !props.dataTemplates.length && props.fetchDataTemplatesList();


  return (
    <Jumbotron>
      <FormGroup controlId="formHorizontalDropDown">
        <Col componentClass={ControlLabel} sm={2}>
          Template:
        </Col>
        <Col sm={10}>
          {/*<FormControl componentClass="select"*/}

          {/*type="input" placeholder="auto"*/}
          {/*//                    onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}*/}
          {/*>*/}
          {/*{this.props.dataTemplates.map((op, idx) => (<option key={idx} value={op}>{op.template_name}</option>))}*/}
          {/*</FormControl>*/}


          <Select.Creatable
            multi={true}
            options={props.dataTemplates.map((option, idx) => ({
              label: option.template_name,
              value: option.template_id,
            }))}
            clearable={false}
            autosize={false}
            onChange={(value) => props.onTemplateFormInputChange(value, "choosenDataTemplates", props.formName)}
            value={props.choosenDataTemplates}
          />


        </Col>
      </FormGroup>
    </Jumbotron>
  )
}

export default TemplateForm
