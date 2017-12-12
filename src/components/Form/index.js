import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'

var json = {
    "id": 123,
    "restAPIEndpoint": "/services/setChain",
    "fields": [
        {
            "humanReadableName": "Отложенный запуск",
            "keyName": "NAME",
            "type": "text",
            "regex": "/{}/"
        },
        {
            "humanReadableName": "Options",
            "type": "dropDown",
            "dropDownOptions": [
                "first", "second", "last"
            ],
            "keyName": "GENDER"
        }
    ]
}


class Input extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.label}</p>
                <input onChange={(event) => {
                    this.props.onFormInputChange(event.target.value)
                }}/>
            </div>)

    }
}

class DropDown extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.label}</p>
                <select onChange={(event) => {
                    this.props.onFormInputChange(event.target.value)
                }}>
                    {this.props.dropDownOptions.map(function (op) {
                        return <option value={op}>{op}</option>
                    })}
                </select>
            </div>
        )
    }
}

class Form extends React.Component {

    render() {
        return (
            <div className='container'>
                <Jumbotron>
                    <h1>Form</h1>
                    {this.props.formData.fields.map((field) => {
                        if (field.type == "text") {
                            return <Input
                                onFormInputChange={(value) => this.props.onFormInputChange(value, field.keyName, this.props.formName)}
                                label={field.humanReadableName}/>
                        }
                        if (field.type == "dropDown") {
                            return <DropDown
                                onFormInputChange={(value) => this.props.onFormInputChange(value,
                                    field.keyName,
                                    this.props.formName)}
                                label={field.humanReadableName}
                                dropDownOptions={field.dropDownOptions}/>
                        }
                    })}
                </Jumbotron>
            </div>
        )
    }
}

export default Form
