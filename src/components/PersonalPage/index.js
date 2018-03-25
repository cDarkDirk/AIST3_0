import React from "react";
import Header from "../Header";
import {forceLogin, getUserName} from "../../globalFunc";
import {Button, Col, FormControl} from "react-bootstrap";
import Notifications from "react-notification-system-redux";
import DropDownSelector from "../DropDownSelector/index";


class PersonalPage extends React.Component {

  componentWillMount() {
    forceLogin();
    this.props.fetchGroups();
  }

  state = {
    groupName: "",
    groupIndex: null,
  };

  componentDidMount() {
    this.props.fetchGroups();
  }

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
  // dataPersonal : {selectedForm}
  render() {
    const {selectGroupForm, formBuilderChains } = this.state;
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
          {/*<DropDownSelector id={12}*/}
                            {/*onSelect={selectGroupForm}*/}
                             {/*dropOptions={formBuilderChains.map((option, index) => {*/}
                               {/*return {value: option.name, label: option.name}*/}
                             {/*})}*/}
                             {/*selectedIndex={selectedForm}*/}
          {/*/>*/}
          <DropDownSelector id={12}
                            onSelect={selectGroupForm}
          dropOptions={[
            {'name': 'Education', 'number': 33},
            {'name': 'Promotion', 'number': 10},
            {'name': 'Events', 'number': 55 }
          ]}
          />
        </Col>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default PersonalPage;
