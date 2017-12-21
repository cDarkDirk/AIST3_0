import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import DatePicker from "react-datepicker"
import {fetchDataTemplatesList} from "../../api";


class TemplateForm extends React.Component {

    // componentDidMount() {
    //     this.props.fetchDataTemplatesList(this.props.formName)
    // }

    render() {
debugger
        return (<div>

            <ul>{this.props.dataTemplates.map((template, index) => {

                return <li>
                        {template.template_name}
                    </li>
                }
            )}</ul>
            <button onClick={this.props.fetchDataTemplatesList}>Click</button>
        </div>)
    }
}

export default TemplateForm
