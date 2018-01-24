import React from "react";
import {Row, Col} from "react-bootstrap"
import ScheduleForm from "../../containers/ScheduleForm";
import Form from "../../containers/Form";
import TemplateForm from "../../containers/TemplateForm";
import DropDownSelector from "../DropDownSelector";


class LauncherPage extends React.Component {

  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  render() {
    const {formBuilderChains, selectChainForm, launcher} = this.props;
    //const form = formBuilderChains[launcher.selectedForm];

    return (
      <div>
        {/*<DropDownSelector id onSelect dropOptions selectedValue/>*/}
        <DropDownSelector id={12}
                          onSelect={selectChainForm}
                          dropOptions={formBuilderChains.map((option, index) => {
                            return {value: option.name, label: option.name}
                          })}
                          selectedIndex={launcher.selectedForm}
        />

        <div className="container">
          <Row>
            <ScheduleForm></ScheduleForm>
          </Row>
          <TemplateForm></TemplateForm>
          <Row><Form formName="connectServices"></Form></Row>
        </div>
      </div>
    )
  }
}

export default LauncherPage;
