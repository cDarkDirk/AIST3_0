import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import Calendar from "react-calendar";


const Input = ({label, onFormInputChange}) => {
    return (
        <div>
            <p>{label}</p>
            <input onChange={(event) => {
                onFormInputChange(event.target.value)
            }}/>
        </div>)
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

    componentDidMount() {
        this.props.fetchFormTemplate(this.props.formName)
    }

    render() {
        return (
            <div className='container'>
                <Jumbotron>
                    <h1>Form</h1>
                    {
                        this.props.formData ? (<div>{this.props.formData.fields.map((field,index) => {
                        if (field.type === "text") {
                            return <Input key={index}
                                onFormInputChange={(value) => this.props.onFormInputChange(value, field.paramName, this.props.formName)}
                                label={field.label}/>
                        }
                        if (field.type === "dropDown") {
                            return <DropDown key={index}
                                onFormInputChange={(value) => this.props.onFormInputChange(value,
                                    field.paramName,
                                    this.props.formName)}
                                label={field.label}
                                dropDownOptions={field.dropDownOptions}/>
                        }
                        if (field.type === "calendar") {
                            return <Calendar key={index}/>
                        }
                    })}</div>) : (<div> NO DATA SPECIFIED </div>)
                    }
                </Jumbotron>
            </div>
        )
    }
}

export default Form
