import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import Calendar from "react-calendar";

const json = {
    "id": "setChain",
    "restApiEndpoint": "/services/setChain",
    "fields": [
        {
            "label": "Количество заявок",
            "paramName": "ordersQuantity",
            "type": "text"
        },
        {
            "label": "Отложенный запуск",
            "paramName": "startTime",
            "type": "calendar"
        },
        {
            "label": "Ежедневный запуск",
            "paramName": "isEverydayLaunch",
            "type": "boolSwitch"
        },
        {
            "label": "Время ежедневного запуска",
            "paramName": "EverydayLaunchTime",
            "type": "clock"
        },
        {
            "label": "Пол",
            "paramName": "GENDER",
            "type": "dropDown",
            "dropDownOptions": ["Мужской", "Женский"]
        },
        {
            "label": "Фамилия",
            "paramName": "SURNAME",
            "type": "text",
            "regExp": "[А-Яа-я]"
        },
        {
            "label": "Имя",
            "paramName": "NAME",
            "type": "text",
            "regExp": "[А-Яа-я]"
        },
        {
            "label": "Отчество",
            "paramName": "SECONDNAME",
            "type": "text",
            "regExp": "[А-Яа-я]"
        },
        {
            "label": "Серия паспорта",
            "paramName": "SERIE",
            "type": "text",
            "regExp": "\d{4}"
        },
        {
            "label": "Номер паспорта",
            "paramName": "NUMBER",
            "type": "text",
            "regExp": "\d{6}"
        },
        {
            "label": "Регион",
            "paramName": "REGIONOFPERMANENT",
            "type": "text"
        },
        {
            "label": "Город",
            "paramName": "CITYOFPERMANENT",
            "type": "text"
        },
        {
            "label": "Улица",
            "paramName": "STREETOFPERMANENT",
            "type": "text"
        },
        {
            "label": "Дом",
            "paramName": "HOUSENUMBEROFPERMANENT",
            "type": "text"
        },
        {
            "label": "Индекс",
            "paramName": "INDEXOFPERMANENT",
            "type": "text"
        },
        {
            "label": "Место рождения",
            "paramName": "BIRTHPLACE",
            "type": "text"
        },
        {
            "label": "Дата рождения",
            "paramName": "BIRTHDAY",
            "type": "calendar"
        },
        {
            "label": "Кем выдан паспорт",
            "paramName": "PASSPORTISSUEDBY",
            "type": "text"
        },
        {
            "label": "Дата выдачи пасспорта",
            "paramName": "PASSPORTDATEOFISSUE",
            "type": "calendar"
        }
    ]
};

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

    componentDidMount() {
        this.props.fetchFormTemplate(this.props.formName)
    }

    render() {
        return (
            <div className='container'>
                <Jumbotron>
                    <h1>Form</h1>
                    {
                        this.props.formData ? (<div>{this.props.formData.fields.map((field) => {
                        if (field.type === "text") {
                            return <Input
                                onFormInputChange={(value) => this.props.onFormInputChange(value, field.paramName, this.props.formName)}
                                label={field.label}/>
                        }
                        if (field.type === "dropDown") {
                            return <DropDown
                                onFormInputChange={(value) => this.props.onFormInputChange(value,
                                    field.paramName,
                                    this.props.formName)}
                                label={field.label}
                                dropDownOptions={field.dropDownOptions}/>
                        }
                        if (field.type === "calendar") {
                            return <Calendar/>
                        }
                    })}</div>) : (<div> NO DATA SPECIFIED </div>)
                    }
                </Jumbotron>
            </div>
        )
    }
}

export default Form
