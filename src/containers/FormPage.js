import {connect} from 'react-redux'
import React from 'react'
import {onFormInputChange} from '../actions'

import Form from '../components/Form'

var json = {
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

function mapStateToProps(state) {
    return {
        counter: state.ui.counter,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFormInputChange: (value, keyName, formName) => dispatch(onFormInputChange(value, keyName, formName))
    }
}

class FormPage extends React.Component {


    render() {
        console.log(this.props)
        return <Form
            formData={json[this.props.match.params.formName]}
            onFormInputChange={this.props.onFormInputChange}
            formName={this.props.match.params.formName}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPage)
