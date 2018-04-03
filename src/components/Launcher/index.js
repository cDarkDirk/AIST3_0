import React, {Component} from 'react';
import Header from "../Header";
import {forceLogin} from "../../globalFunc";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  Grid,
  InputGroup,
  OverlayTrigger,
  Panel,
  Row,
  Tooltip,
} from "react-bootstrap";
import DropdownList from "../DropdownList/index";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-time-picker/assets/index.css'
import './style.css'
import Notifications from "react-notification-system-redux";
import moment from "moment";

class Launcher extends Component {
  constructor(props, context) {
    super(props, context);
    forceLogin();
    this.props.fetchChainTemplates();
    this.props.fetchStands();
    this.props.fetchGroups();
    this.dataTemplateSelected = this.dataTemplateSelected.bind(this);
    this.onChainSelected = this.onChainSelected.bind(this);
    this.onHeaderInputChange = this.onHeaderInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderChainForm = this.renderChainForm.bind(this);
    this.getFieldValueByKey = this.getFieldValueByKey.bind(this);
    this.onFormInputChange = this.onFormInputChange.bind(this);
    this.fillFormData = this.fillFormData.bind(this);
    this.launch = this.launch.bind(this);
    this.handleStandSelection = this.handleStandSelection.bind(this);
    this.handleGroupsSelection = this.handleGroupsSelection.bind(this);
    this.state = {
      selectedTemplates: [],
      selectedChain: null,
      reqNumber: 1,
      startDate: null,
      formReady: false,
      standIndex: null,
      groups: [],
    }
  }

  dataTemplateSelected(templates) {
    this.setState({selectedTemplates: templates});
  }

  handleGroupsSelection(groups){
    this.setState({groups});
  }

  handleStandSelection(standIndex) {
    this.setState({standIndex});
  }

  onChainSelected(index) {
    if (this.state[this.props.chains[index].name]) {
      this.setState({
        selectedChain: index,
        selectedTemplates: [],
      });
    } else {
      this.setState({
        selectedTemplates: [],
        formReady: false,
        selectedChain: index,
      });
      this.fillFormData(index);
    }
  }

  onHeaderInputChange(newValue) {
    if (newValue.key === 'reqNumber') {
      this.setState({
        reqNumber: newValue.value,
      });
    }
  }

  handleDateChange(date) {
    this.setState({startDate: date});
  }

  getFieldValueByKey(key) {
    const {chains} = this.props;
    return this.state[chains[this.state.selectedChain].name][key];
  }

  onFormInputChange(key, value) {
    const {chains} = this.props;
    let data = {...this.state[chains[this.state.selectedChain].name]};
    data[key] = value;
    this.setState({
      [chains[this.state.selectedChain].name]: data,
    });
  }

  fillFormData(index) {
    const {chains} = this.props;
    let formData = {};
    for (let field of chains[index].fields) {
      formData[field.paramName] = '';
    }
    this.setState({
      [chains[index].name]: formData,
      formReady: true,
    });
  }

  launch() {
    const {chains, submitFormTemplate} = this.props;
    let launchParams = {};
    launchParams['chain_name'] = chains[this.state.selectedChain].name;
    launchParams['data'] = this.state[chains[this.state.selectedChain].name];
    if (this.state.startDate !== null)
      launchParams['start_time'] = this.state.startDate.format('YYYY.MM.DD HH:mm:00');
    launchParams['templateNames'] = this.state.selectedTemplates.map(t => t.value);
    launchParams['groups'] = this.state.groups.map(g => g.label);
    submitFormTemplate(launchParams);
  }

  renderChainForm() {
    const {chains} = this.props;
    const formBody = chains[this.state.selectedChain].fields.map((field, index) => {
      switch (field.type) {
        case 'Input': {
          return (
            <Col md={6} key={chains[this.state.selectedChain].name + field.paramName + 'Col' + index}>
              <FormGroup key={chains[this.state.selectedChain].name + field.paramName + index}
                         controlId={field.paramName + index}>
                <InputGroup key={chains[this.state.selectedChain].name + field.paramName + 'InputGroup' + index}>
                  <InputGroup.Addon key={chains[this.state.selectedChain].name + field.paramName + 'InputGroupAddon' + index}>{field.label}</InputGroup.Addon>
                  <FormControl key={chains[this.state.selectedChain].name + field.paramName + 'FormControl' + index}
                               value={this.getFieldValueByKey(field.paramName)}
                               type="input"
                               placeholder="Пусто"
                               onChange={(event) => this.onFormInputChange(field.paramName, event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          );
        }

        case 'DropDown': {
          return (
            <Col md={6} key={chains[this.state.selectedChain].name + field.paramName + 'Col' + index}>
              <FormGroup key={chains[this.state.selectedChain].name + field.paramName + 'FormGroup' + index}
                         controlId="formHorizontalDropDown">
                <InputGroup key={chains[this.state.selectedChain].name + field.paramName + 'InputGroup' + index}>
                  <InputGroup.Addon key={chains[this.state.selectedChain].name + field.paramName + 'InputGroupAddon' + index}>{field.label}</InputGroup.Addon>
                  <FormControl key={chains[this.state.selectedChain].name + field.paramName + 'FormControl' + index}
                               componentClass="select"
                               value={this.getFieldValueByKey(field.paramName)}
                               type="input"
                               placeholder="Пусто"
                               onChange={(event) => this.onFormInputChange(field.paramName, event.target.value)}>
                    <option key={chains[this.state.selectedChain].name + field.paramName + 'NullValue' + index}
                            value={''}>
                      Пусто
                    </option>
                    {field.dropDownOptions.map((op, idx) => (<option key={chains[this.state.selectedChain].name + op + idx} value={op}>{op}</option>))}
                  </FormControl>
                </InputGroup>
              </FormGroup>
            </Col>
          );
        }

        case 'DatePicker': {
          return (
            <Col md={6} key={chains[this.state.selectedChain].name + field.paramName + 'Col' + index}>
              <FormGroup key={chains[this.state.selectedChain].name + field.paramName + 'FormGroup' + index}
                         controlId={field.paramName + index}>
                <InputGroup key={chains[this.state.selectedChain].name + field.paramName + 'InputGroup' + index}>
                  <InputGroup.Addon key={chains[this.state.selectedChain].name + field.paramName + 'InputGroupAddon' + index}>{field.label}</InputGroup.Addon>
                  <FormControl key={chains[this.state.selectedChain].name + field.paramName + 'FormControl' + index}
                               value={this.getFieldValueByKey(field.paramName)}
                               type="input"
                               placeholder="Пусто"
                               onChange={(event) => this.onFormInputChange(field.paramName, event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          )
        }

        default:
          return null;
      }
    });

    return (
      <Form key={chains[this.state.selectedChain].name + 'FormTag'}>
        <Row key={chains[this.state.selectedChain].name + 'RowTag'}>
          {formBody}
        </Row>
      </Form>
    )
  }

  render() {
    const {chains} = this.props;
    const setTooltip = (id, text) => (
      <Tooltip key={id.toString()+'Tooltip'} id={id.toString()}>{text}</Tooltip>
    );
    const header = (
      <Row key={'headerRow'}>
        <Col md={11} key={'chainSelectorColumn'}>
          <DropdownList
            key={'DropdownListChainSelector'}
            id={'launcherDropdown'}
            options={chains}
            tooltip={setTooltip('chainSelect', 'Выберите цепочку из выпадающего списка')}
            onSelect={this.onChainSelected}
            selectedIndex={this.state.selectedChain}
            selLabel={this.state.selectedChain !== null ? chains[this.state.selectedChain].name : 'Select one...'}
          />
        </Col>
        {this.state.selectedChain !== null
        && chains[this.state.selectedChain].fields.length > 0 ? [
          <Col md={1} key={'StandsSelectorColumn'}>
            {/*<DropdownList
              key={'StandsDropdown'}
              id={'standsDropdown'}
              options={this.props.stands}
              tooltip={setTooltip('standSelect', 'Выберите тестовый контур')}
              onSelect={this.handleStandSelection}
              selectedIndex={this.state.standIndex}
              labelKey='code'
              bsStyle='info'
              selLabel={this.state.standIndex !== null ? this.props.stands[this.state.standIndex].code : 'Пусто'}
            />
            &nbsp;*/}
            <Button key={'LaunchButton'} bsStyle='success' /*disabled={this.state.standIndex === null}*/ onClick={this.launch}>
              <Glyphicon key={'launchGlyph'} glyph='glyphicon glyphicon-play'/>
            </Button>
          </Col>] : null}
      </Row>
    );

    const orderCreatedAlert = () => {
      if (this.props.orderId !== null) {
        return (
          <Alert onDismiss={this.props.clearIdOrderAlert} key={'orderCreatedAlert'} bsStyle="success">
            {this.props.orderId}
          </Alert>)
      }
      return null;
    };

    const selectGroups = this.props.groups.map((group, index) => {
      return {
        label: group.name,
        value: index,
      }
    });

    return [
      <Header/>,
      <Grid>
        {orderCreatedAlert()}
        <Panel header={header} bsStyle={'info'}>
          {this.state.selectedChain !== null
          && chains[this.state.selectedChain].fields.length > 0 ?
            <Panel key={'additionalParamsPanel'} bsStyle='info' header={'Параметры запуска'}>
              <Col md={2} key={'FirstColumnKey'}>
                <OverlayTrigger
                  key={'launchTimeOverlay'}
                  placement="top"
                  overlay={setTooltip('Date', 'Задайте дату запуска заявки')}
                >
                  <div className={'form-date-picker'} key={'launchTimeDatepickerStyleDiv'}>
                    <DatePicker
                      key={'launchTimeDatepicker'}
                      locale="ru-RU"
                      dateFormat="DD.MM.YYYY HH:mm"
                      todayButton='Сегодня'
                      showTimeSelect
                      placeholderText='Время запуска'
                      timeFormat="HH:mm"
                      timeIntervals={10}
                      selected={this.state.startDate}
                      onChange={this.handleDateChange}
                    />
                  </div>
                </OverlayTrigger>
              </Col>
              <Col md={6} key={'SecondColumnKey'}>
                <OverlayTrigger
                  key={'launchDataTemplateSelectorOverlay'}
                  placement="top"
                  overlay={setTooltip('templates', 'Задайте шаблон данных')}
                >
                  <div key={'additionalDiv'}>
                    <Select.Creatable
                      id={'launchDataTemplateSelectorSelect'}
                      key={'launchDataTemplateSelector'}
                      wrapperStyle={{zIndex: '3', position: 'relative'}}
                      multi={true}
                      placeholder='Задайте шаблон данных'
                      options={this.state.selectedChain !== null ? chains[this.state.selectedChain].templates : []}
                      onChange={this.dataTemplateSelected}
                      value={this.state.selectedTemplates}
                    />
                  </div>
                </OverlayTrigger>
              </Col>
              <Col md={4} key={'ThirdColumnKey'}>
                <OverlayTrigger
                  key={'launchGroupSelectorOverlay'}
                  placement="top"
                  overlay={setTooltip('groups', 'Выберите группы для доступа к данным')}
                >
                  <div key={'additionalDivOne'}>
                    <Select.Creatable
                      key={'launchGroupSelector'}
                      id={'launchGroupSelectorSelect'}
                      wrapperStyle={{zIndex: '3', position: 'relative'}}
                      multi={true}
                      placeholder='Выберите группы для доступа к данным'
                      options={this.state.selectedChain !== null ? selectGroups : []}
                      onChange={this.handleGroupsSelection}
                      value={this.state.groups}
                    />
                  </div>
                </OverlayTrigger>
              </Col>
            </Panel> : null}
          {(this.state.selectedChain !== null && this.state.formReady)
            ? chains[this.state.selectedChain].fields.length > 0 ? this.renderChainForm()
              : <Alert key={'CreateFormFirstAlert'} bsStyle="info">Для запуска теста по этой цепочке необходимо сначала создать форму</Alert>
            : <Alert key={'SelectChainFirst'} bsStyle="warning">Ни одна цепочка не выбрана!</Alert>}
        </Panel>
        <Notifications notifications={this.props.notifications}/>
      </Grid>
    ]
  }
}

export default Launcher;
