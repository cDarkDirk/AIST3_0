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
            "dropDownOptions" : [
                "first", "second", "last"
            ],
            "keyName": "GENDER"
        }
    ]
}


class Input extends React.Component{
    render() {
        return(
            <div>
            <p>{this.props.label}</p>
            <input />
        </div>)

    }
}

class DropDown extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.label}</p>
                <select>
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
                    {json.fields.map(function(some){
                        if (some.type == "text"){
                            return <Input label = {json.fields[0].humanReadableName}/>
                        }
                        if(some.type == "dropDown") {
                            return <DropDown label={json.fields[1].humanReadableName} dropDownOptions={json.fields[1].dropDownOptions}/>
                        }
                    })}
                </Jumbotron>
            </div>
        )
    }
}

export default Form
