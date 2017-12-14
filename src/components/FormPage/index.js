import React from 'react'
import Form from '../../containers/Form'

export default ({match, onFormInputChange, formName, formTemplate, fetchFormTemplate}) => {
    return (
        <Form formName={match.params.formName} />
    )
}
