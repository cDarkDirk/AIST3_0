import React from 'react'
import Form from '../Form'

const json = {
    connectServices: {
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
}


export default ({match, onFormInputChange, formName}) => {
  return (
    <Form
        formData={json[match.params.formName]}
        onFormInputChange={onFormInputChange}
        formName={match.params.formName}/>
  )
}
