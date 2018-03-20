import React from "react";
import Header from "../Header";
import {forceLogin, getUserName} from "../../globalFunc";
import {Button, Col, FormControl} from "react-bootstrap";
import Notifications from "react-notification-system-redux";


class PersonalPage extends React.Component {

  componentWillMount() {
    forceLogin();
  }

  state = {
    groupName: "",
  };

  changeGroupName(payload) {
    if (payload.key === "groupName") {
      this.setState({groupName: payload.value})
    }
  }

  createGroupButtonClick() {
    const {createGroupClicked, groupNameChange} = this.props;
    groupNameChange({value: this.state.groupName, key: "groupName"});
    createGroupClicked(this.state);
  }

  render() {
    return (
      <div>
        <Header owner={getUserName()}/>
        <Col sm={10}>
          <FormControl className="form-control"
                       type="text"
                       value={this.state.groupName}
                       onChange={e => this.changeGroupName({value: e.target.value, key: "groupName"})}
                       label="CreateGroup"
                       placeholder="Enter group name"/>
          <Button
            className="btn btn-default btn-sm"
            onClick={() => this.createGroupButtonClick()}
          >Создать Группу</Button>
        </Col>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default PersonalPage;
