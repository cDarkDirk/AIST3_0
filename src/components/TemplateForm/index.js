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


class TemplateForm extends React.Component {

    componentDidMount() {
        this.props.fetchDataTemplatesList()
    }

    render() {
        return (
          <Jumbotron>
            <FormGroup controlId="formHorizontalDropDown">
                <Col componentClass={ControlLabel} sm={2}>
                    Template:
                </Col>
                <Col sm={10}>
                    <FormControl componentClass="select"

                                 type="input" placeholder="auto"
                        //                    onChange={(event) => onFormInputChange(event.target.value, field.paramName, this.props.formName)}
                    >
                        {this.props.dataTemplates.map((op, idx) => (<option key={idx} value={op}>{op.template_name}</option>))}
                    </FormControl>
                </Col>
            </FormGroup>
          </Jumbotron>
        )
    }
}

export default TemplateForm
