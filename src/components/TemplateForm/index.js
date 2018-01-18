import React from 'react'
import {
    Col,
    FormControl,
    FormGroup,
    ControlLabel,
} from "react-bootstrap"


class TemplateForm extends React.Component {

    componentDidMount() {
        this.props.fetchDataTemplatesList()
    }

    render() {
        return (
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
        )
    }
}

export default TemplateForm
