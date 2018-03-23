import React from 'react'
import {
  Jumbotron,
  InputGroup,
} from 'react-bootstrap'
import {
  Row,
  Col,
  Grid,
  FormControl,
  FormGroup,
  Form,
  Button,
} from "react-bootstrap"
import "./style.css"
import DatePicker from "react-datepicker"

class MyForm extends React.Component {

  constructor(props, context){
    super(props, context);
    this.props.fetchBuilderChains();

  }

  submitTemplateForm = () => {
    const {formName, formValues, scheduler, submit, choosenDataTemplates, name} = this.props;
    submit(formName, formValues, scheduler, choosenDataTemplates, name);
  };

  render() {
    const {formName, formValues, onFormInputChange} = this.props;
    const formTemplate = this.props.formBuilderChains[formName];

    const form = formTemplate ? (formTemplate.fields.map((field, index) => {
      if (field.type === "Input") {
        return (
          <FormGroup controlId="formHorizontalInput">
            <InputGroup>
              <InputGroup.Addon>{field.label}</InputGroup.Addon>
              <FormControl value={formValues[field.paramName]} type="input" placeholder="Enter value..."
                           onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}/>
            </InputGroup>
          </FormGroup>
        )
      } else if (field.type === "DropDown") {
        return (
          <FormGroup controlId="formHorizontalDropDown">
            <InputGroup>
              <InputGroup.Addon>{field.label}</InputGroup.Addon>
              <FormControl componentClass="select" value={formValues[field.paramName]}
                           type="input" placeholder="auto"
                           onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}>
                           <option key={'notSelected'} value={''}>{'Select one...'}</option>
                {field.dropDownOptions.map((op, idx) => (<option key={idx} value={op}>{op}</option>))}
              </FormControl>
            </InputGroup>
          </FormGroup>
        )
      }/* else if (field.type === "DatePicker") {
        return (
          <FormGroup controlId="calendar">
            <InputGroup>
              <InputGroup.Addon>{field.label}</InputGroup.Addon>
              <div className={"form-date-picker"}>
                <DatePicker key={index}
                            onChange={(date) => onFormInputChange(date.format('D.MM.Y'), field.paramName, this.props.formName)}
                            selected={moment(formValues[field.paramName])}
                />
              </div>
            </InputGroup>
          </FormGroup>)
      }*/
      else return null;
    }).map((field, index) => {
      return (<Col md={6}>{field}</Col>)
    })) : (
      <div> NO FORM TEMPLATE SPECIFIED</div>
    );

    return (
      <div className='container'>
        <Jumbotron>
          <Grid>
            <Form horizontal>
              <Row>{form}</Row>
              <Row><Button onClick={() => this.submitTemplateForm()}>Отправить на запуск</Button></Row>
            </Form>
          </Grid>

        </Jumbotron>
      </div>
    )
  }
}

export default MyForm
