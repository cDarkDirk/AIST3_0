import React from "react";
import {Row} from "react-bootstrap"
import ScheduleForm from "../../containers/ScheduleForm"
import Form from "../../containers/Form"
import TemplateForm from "../../containers/TemplateForm"
import DropDownSelector from "../DropDownSelector"


class LauncherPage extends React.Component {

  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  render() {
    const {formBuilderChains, selectChainForm, launcher: {selectedForm}} = this.props;
    return (
      <div>
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
          <Row><Form formName={selectedForm}/></Row>
        </div>
        }
      </div>
    )
  }
}

export default LauncherPage
