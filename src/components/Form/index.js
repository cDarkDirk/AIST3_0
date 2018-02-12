import React from 'react'
import {Jumbotron, InputGroup} from 'react-bootstrap'
import {Row, Col, Grid, FormControl, FormGroup, ControlLabel, Form, Checkbox, Button, Dropdown} from "react-bootstrap"
import "./style.css"
import Calendar from "react-calendar";
import DatePicker from "react-datepicker"
import {submitFormTemplate} from "../../api";

class MyForm extends React.Component {

  componentDidMount() {
    this.props.fetchBuilderChains()
    // this.props.fetchFormTemplate(this.props.formName)
  }

  submitTemplateForm = () => {
    const {formName, formValues, scheduler, submit, choosenDataTemplates} = this.props;
    submit(formName, formValues, scheduler, choosenDataTemplates);
  };

  render() {
    const {formName, formValues, onFormInputChange} = this.props
    const formTemplate = this.props.formBuilderChains[formName]
    console.log(formTemplate)

    const form = formTemplate ? (formTemplate.fields.map((field, index) => {
      if (field.type === "Input") {
        return (
          <FormGroup controlId="formHorizontalInput">
            <InputGroup>
              <InputGroup.Addon>{field.label}</InputGroup.Addon>
              <FormControl value={formValues[field.paramName]} type="input" placeholder="auto"
                           onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}/>
            </InputGroup>
          </FormGroup>
        )
      }
      if (field.type === "DropDown") {
        return (
          <FormGroup controlId="formHorizontalDropDown">
            <InputGroup>
              <InputGroup.Addon>{field.label}</InputGroup.Addon>
              <FormControl componentClass="select" value={formValues[field.paramName]}

                           type="input" placeholder="auto"
                           onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}>
                {field.dropDownOptions.map((op, idx) => (<option key={idx} value={op}>{op}</option>))}
              </FormControl>
            </InputGroup>
          </FormGroup>

        )
      }
      if (field.type === "DatePicker") {
        return (
          <FormGroup controlId="calendar">
            <InputGroup>
              <InputGroup.Addon>{field.label}</InputGroup.Addon>
              <div   className={"form-date-picker"}>
              <DatePicker key={index}
                          onChange={(date) => onFormInputChange(date, field.paramName, this.props.formName)}
                          selected={formValues[field.paramName]}
              />
              </div>
            </InputGroup>
          </FormGroup>)
      }
    }).map((field, index) => {

      return (<Col md={6}>{field}</Col>)
    })) : (
      <div> NO FORM TEMPLATE SPECIFIED</div>
    )

    return (
      <div className='container'>
        <Jumbotron>
          <Grid>
            <Form horizontal>
              <Row>{form}</Row>
              <Row><Button onClick={() => this.submitTemplateForm()}>Сохранить</Button></Row>
            </Form>
          </Grid>

        </Jumbotron>
      </div>
    )
  }
}

export default MyForm
