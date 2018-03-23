import React from "react";
import {Row} from "react-bootstrap"
import ScheduleForm from "../../containers/ScheduleForm"
import Form from "../../containers/Form"
import TemplateForm from "../../containers/TemplateForm"
import DropDownSelector from "../DropDownSelector"
import Header from "../Header";
import {forceLogin, getUserName} from '../../globalFunc';
import Notifications from 'react-notification-system-redux'


class LauncherPage extends React.Component {
  componentWillMount(){
    forceLogin();
  }

  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  render() {
    const {formBuilderChains, selectChainForm, launcher: {selectedForm}, launcher: {formName}, owner} = this.props;
    return (
      <div>
        <Header owner={getUserName()}/>
        <DropDownSelector id={12}
                          onSelect={selectChainForm}
                          dropOptions={formBuilderChains.map((option, index) => {
                            return {value: option.name, label: option.name}
                          })}
                          selectedIndex={selectedForm}
        />
        {formBuilderChains.length &&
        <div className="container">
          <Row>
            <ScheduleForm/>
          </Row>
          <TemplateForm/>
          <Row><Form formName={selectedForm} name={formName}/></Row>
        </div>
        }
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default LauncherPage
