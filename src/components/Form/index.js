import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import Calendar from "react-calendar";


const Input = ({label, value, onChange}) => {
    return (
        <div>
            <p>{label}</p>
            <input value={value || ''} onChange={(event) => {onChange(event.target.value)}}/>
        </div>)
}

const DropDown = ({label, value, onChange, dropDownOptions}) => {
      return (
          <div>
              <p>{label}</p>
              <select value={value} onChange={(event) => {onChange(event.target.value)}}>
                  <option key={-1} value=''></option>
                  {dropDownOptions.map((op, idx) => (<option key={idx} value={op}>{op}</option>))}
              </select>
          </div>
      )
  }

class Form extends React.Component {

    componentDidMount() {
        this.props.fetchFormTemplate(this.props.formName)
    }

    render() {
        const {formName, formTemplate, formValues, onFormInputChange} = this.props
        return (
            <div className='container'>
                <Jumbotron>
                    <h1>Form</h1>
                    {
                        formTemplate ? (<div>{formTemplate.fields.map((field,index) => {
                        if (field.type === "text") {
                            return <Input key={index}
                                onChange={(value) => onFormInputChange(value, field.paramName, this.props.formName)}
                                label={field.label}
                                value={formValues[field.paramName]}/>
                        }
                        if (field.type === "dropDown") {
                            return <DropDown key={index}
                                onChange={(value) => onFormInputChange(value, field.paramName, formName)}
                                label={field.label}
                                dropDownOptions={field.dropDownOptions}
                                value={formValues[field.paramName]}/>
                        }
                        if (field.type === "calendar") {
                            return <Calendar key={index}/>
                        }
                    })}</div>) : (<div> NO FORM TEMPLATE SPECIFIED </div>)
                    }
                </Jumbotron>
            </div>
        )
    }
}

export default Form
