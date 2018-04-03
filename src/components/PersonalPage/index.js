import React,{Component} from "react";
import Header from "../Header";
import {forceLogin} from "../../globalFunc";
import {
  Button,
  Col,
  FormControl,
  Grid,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Panel,
  Row,
  Tooltip
} from "react-bootstrap";
import Notifications from "react-notification-system-redux";
import DropdownList from "../DropdownList";
import Select from 'react-select';
import './style.css'


class PersonalPage extends Component {
  constructor(props, context) {
    super(props, context);
    forceLogin();
    this.props.fetchGroups();
    this.props.fetchGroupsForMembers();
    this.onGroupSelected = this.onGroupSelected.bind(this);
    this.dataMembersSelected = this.dataMembersSelected.bind(this);
    this.updateGroupMembersButtonClick = this.updateGroupMembersButtonClick.bind(this);
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
      this.setState({
        selectedGroup: index,
        selectedMembers: [],
      });
  }

  changeGroupName(payload) {
      this.setState({groupName: payload.value})
  }

  updateGroupMembersButtonClick() {
    const {membersTemplates, submitFormMembers} = this.props;
    let groupParameters = {};
    groupParameters['groupName'] = membersTemplates[this.state.selectedGroup].name;
    groupParameters['members'] = this.state.selectedMembers.map(t => t.value);
    submitFormMembers(groupParameters);
    this.setState({selectedGroup : null});
  }

  createGroupButtonClick() {
    const {createGroupClicked} = this.props;
    createGroupClicked(this.state);
  }

  render() {
    const {formBuilderGroups, membersTemplates,selectedGroups} = this.props;
    const setTooltip = (id, text) => (
      <Tooltip id={id.toString()}>{text}</Tooltip>
    );
    const groups = selectedGroups.map((name, index) => {
      return {label: name, value: name};
    });
    const groupsList = () => (groups.map((group) =>
      <ListGroupItem
      >
        {group.value}
        &nbsp;
        &nbsp;
      </ListGroupItem>));
    return (
      <div>
        <Header/>
        <Grid>
          <Panel header={"Создание группы"}>
            <Row>
              <Col sm={6}>
                <FormControl className="form-control"
                             type="text"
                             value={this.state.groupName}
                             onChange={e => this.changeGroupName({value: e.target.value})}
                             label="CreateGroup"
                             placeholder="Введите название новой группы"/>
              </Col>
              <Col md={1}>
                <Button
                  className="btn btn-default btn-sm"
                  onClick={() => this.createGroupButtonClick()}
                >Создать Группу</Button>
              </Col>
            </Row>
          </Panel>
        </Grid>
        <Grid>
          <Panel header={"Добавление пользователей в группы"}>
            <Row>
              <Col md={3}>
                <DropdownList
                  id={'launcherDropdown'}
                  options={formBuilderGroups}
                  tooltip={setTooltip('groupSelect', 'Выберите группу из выпадающего списка')}
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
                        placeholder="Выберите необходимых пользователей"
                      />
                    </div>
                  </OverlayTrigger>
                  : null}
              </Col>
              <Col md={1}>
                {this.state.selectedGroup !== null ?
                  <Button
                    className="btn btn-default btn-sm"
                    onClick={() => this.updateGroupMembersButtonClick()}
                  >Добавить в группу </Button>
                  : null}
              </Col>
            </Row>
          </Panel>
        </Grid>
        <Grid>
          <Panel header={"Список групп в которые входит пользователь"}>
            <Row>
              <Col sm={3}/>
              <Col sm={6}>
                <ListGroup className ="listgroup">
                  {groupsList()}
                </ListGroup>
              </Col>
            </Row>
          </Panel>
        </Grid>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default PersonalPage;
