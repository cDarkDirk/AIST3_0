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
  Jumbotron,
  OverlayTrigger,
  Panel,
  Row,
  Tooltip,
} from "react-bootstrap";
import DropdownList from "../DropdownList/index";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import moment from "moment";
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-time-picker/assets/index.css'
import './style.css'

class Launcher extends Component {
  constructor(props, context) {
    super(props, context);
    forceLogin();
    this.props.fetchChainTemplates();
    this.dataTemplateSelected = this.dataTemplateSelected.bind(this);
    this.onChainSelected = this.onChainSelected.bind(this);
    this.onHeaderInputChange = this.onHeaderInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderChainForm = this.renderChainForm.bind(this);
    this.getFieldValueByKey = this.getFieldValueByKey.bind(this);
    this.onFormInputChange = this.onFormInputChange.bind(this);
    this.fillFormData = this.fillFormData.bind(this);
    this.launch = this.launch.bind(this);
    this.state = {
      selectedTemplates: [],
      selectedChain: null,
      reqNumber: 1,
      startDate: moment(),
      formReady: false,
    }
  }

  dataTemplateSelected(templates) {
    this.setState({selectedTemplates: templates});
  }

  onChainSelected(index) {
    if(this.state[this.props.chains[index].name]) {
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

  launch(){
    const {chains,submitFormTemplate} = this.props;
    let launchParams = {};
    launchParams['chain_name'] = chains[this.state.selectedChain].name;
    launchParams['data'] = this.state[chains[this.state.selectedChain].name];
    launchParams['start_time'] = this.state.startDate.format('YYYY.MM.DD HH:mm:' + '00');
    launchParams['templateNames'] = this.state.selectedTemplates.map(t => t.value);
    console.log('shit to launch ->', launchParams);
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
                  <InputGroup.Addon>{field.label}</InputGroup.Addon>
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
                  <InputGroup.Addon>{field.label}</InputGroup.Addon>
                  <FormControl key={chains[this.state.selectedChain].name + field.paramName + 'FormControl' + index}
                               componentClass="select"
                               value={this.getFieldValueByKey(field.paramName)}
                               type="input"
                               placeholder="Пусто"
                               onChange={(event) => this.onFormInputChange(field.paramName, event.target.value)}>
                    <option key={chains[this.state.selectedChain].name + field.paramName + 'NullValue' + index}
                            value={''}>Пусто
                    </option>
                    {field.dropDownOptions.map((op, idx) => (<option key={op + idx} value={op}>{op}</option>))}
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
                  <InputGroup.Addon>{field.label}</InputGroup.Addon>
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
      <Form>
        <Row>
          {formBody}
        </Row>
      </Form>
    )
  }

  render() {
    const {chains} = this.props;
    const setTooltip = (id, text) => (
      <Tooltip id={id.toString()}>{text}</Tooltip>
    );
    const header = (
      <Row>
        <Col md={3}>
              <DropdownList
                id={'launcherDropdown'}
                options={chains}
                tooltip={setTooltip('chainSelect', 'Выберите цепочку из выпадающего списка')}
                onSelect={this.onChainSelected}
                selectedIndex={this.state.selectedChain}
                selLabel={this.state.selectedChain !== null ? chains[this.state.selectedChain].name : 'Select one...'}
              />
        </Col>
        <Col md={2}>
          {this.state.selectedChain !== null ?
            <OverlayTrigger
              placement="top"
              overlay={setTooltip('Date', 'Задайте дату запуска заявки')}
            >
              <div className={'form-date-picker'}>
                <DatePicker
                  locale="ru-RU"
                  dateFormat="DD.MM.YYYY HH:mm"
                  todayButton='Сегодня'
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                />
              </div>
            </OverlayTrigger>
            : null}
        </Col>
        <Col md={6}>
          {this.state.selectedChain !== null ?
            <OverlayTrigger
              placement="top"
              overlay={setTooltip('templates', 'Задайте шаблон данных')}
            >
              <div>
                <Select.Creatable
                  wrapperStyle={{zIndex: '3', position: 'relative'}}
                  multi={true}
                  options={this.state.selectedChain !== null ? chains[this.state.selectedChain].templates : []}
                  onChange={this.dataTemplateSelected}
                  value={this.state.selectedTemplates}
                />
              </div>
            </OverlayTrigger>
            : null}
        </Col>
        <Col md={1}>
          {this.state.selectedChain !== null ?
            <Button bsStyle='success' onClick={this.launch}>
              <Glyphicon glyph='glyphicon glyphicon-play'/>
            </Button>
            : null}
        </Col>
      </Row>
    );

    return [
      <Header/>,
      <Grid>
        <Panel header={header} bsStyle={'info'}>
          {(this.state.selectedChain !== null && this.state.formReady)
            ? this.renderChainForm()
            : <Alert bsStyle="warning">Ни одна цепочка не выбрана!</Alert>}
        </Panel>
      </Grid>
    ]
  }
}

export default Launcher;