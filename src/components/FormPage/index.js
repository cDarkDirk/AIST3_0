import React from 'react'
import Form from '../Form'

export default ({match, onFormInputChange, formName, formTemplate, fetchFormTemplate}) => {
    return (
        <Form
            formData={formTemplate}
            onFormInputChange={onFormInputChange}
            formName={match.params.formName}
            fetchFormTemplate={fetchFormTemplate}/>
    )
}
