import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import {Row, Col, Grid, FormControl, FormGroup, ControlLabel, Form} from "react-bootstrap"
import "./style.css"
import DatePicker from "react-datepicker"

class MyForm extends React.Component {

    componentDidMount() {
        this.props.fetchFormTemplate(this.props.formName)
    }

    render() {
        const {formName, formTemplate, formValues, onFormInputChange} = this.props

        const form = formTemplate ? (formTemplate.fields.map((field, index) => {
            if (field.type === "text") {
                return (
                    <FormGroup controlId="formHorizontalInput">
                        <Col componentClass={ControlLabel} sm={2}>
                            {field.label}
                        </Col>
                        <Col sm={10}>
                            <FormControl value={formValues[field.paramName]} type="input" placeholder="auto"
                                         onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}/>
                        </Col>
                    </FormGroup>
                )
            }
            if (field.type === "dropDown") {
                return (
                    <FormGroup controlId="formHorizontalDropDown">
                        <Col componentClass={ControlLabel} sm={2}>
                            {field.label}
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select" value={formValues[field.paramName]}

                                         type="input" placeholder="auto"
                                         onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}>
                                {field.dropDownOptions.map((op, idx) => (<option key={idx} value={op}>{op}</option>))}
                            </FormControl>
                        </Col>
                    </FormGroup>
                )
            }
            if (field.type === "calendar") {
                return (
                    <FormGroup controlId="calendar">
                        <Col componentClass={ControlLabel} sm={2}>
                            {field.label}
                        </Col>

                        <Col sm={10}>
                            <div>
                                <DatePicker key={index}
                                            onChange={(date) => onFormInputChange(date, field.paramName, this.props.formName)}
                                            selected={formValues[field.paramName]}
                                />
                            </div>
                        </Col>
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
                    <h1>Form</h1>
                    <Grid>
                        <Form horizontal>
                            <Row>{form}</Row>
                        </Form>
                    </Grid>

                </Jumbotron>
            </div>
        )
    }
}

export default MyForm
