import React from "react";
import Header from "../Header";
import {forceLogin, getUserName} from "../../globalFunc";
import {Button, Col, FormControl, OverlayTrigger, Tooltip} from "react-bootstrap";
import Notifications from "react-notification-system-redux";
import DropdownList from "../DropdownList";
import Select from 'react-select';


class PersonalPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    forceLogin();
    this.props.fetchGroups();
    this.onGroupSelected = this.onGroupSelected.bind(this);
    this.dataMembersSelected = this.dataMembersSelected.bind(this);
   // this.fillFormData = this.fillFormData.bind(this);
    this.state = {
      selectedMembers: [],
      groupName: "",
      selectedGroup: null,
    };
  }


  dataMembersSelected(members) {
    this.setState({selectedMembers: members});
  }
  onGroupSelected(index) {
    if (this.state[this.props.formBuilderGroups[index].name]) {
      this.setState({
        selectedGroup: index,
        selectedMembers:[],
      });
    } else {
      this.setState({
        //formReady: false,
        selectedGroup: index,
        selectedMembers:[],
      });
      //this.fillFormData(index);
    }
  }

  // fillFormData(index) {
  //   const {formBuilderGroups} = this.props;
  //   this.setState({
  //     formReady: true,
  //   });
  // }



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
    const {formBuilderGroups , membersTemplates} = this.props;
    console.log(formBuilderGroups);
    const setTooltip = (id, text) => (
      <Tooltip id={id.toString()}>{text}</Tooltip>
    );
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
          <DropdownList
            id={'launcherDropdown'}
            options={formBuilderGroups}
            tooltip={setTooltip('groupSelect', 'Выберите цепочку из выпадающего списка')}
            onSelect={this.onGroupSelected}
            selectedIndex={this.state.selectedGroup}
            selLabel={this.state.selectedGroup !== null ? formBuilderGroups[this.state.selectedGroup].name : 'Select one...'}
          />
        </Col>
        <Col md={6}>
          {this.state.selectedGroup !== null ?
            <OverlayTrigger
              placement="top"
              overlay={setTooltip('members', 'Задайте шаблон данных')}
            >
              <div>
                <Select.Creatable
                  wrapperStyle={{zIndex: '3', position: 'relative'}}
                  multi={true}
                  options={this.state.selectedGroup !== null ? membersTemplates[this.state.selectedGroup].members : []}
                  onChange={this.dataMembersSelected}
                  value={this.state.selectedMembers}
                />
              </div>
            </OverlayTrigger>
            : null}
        </Col>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default PersonalPage;
